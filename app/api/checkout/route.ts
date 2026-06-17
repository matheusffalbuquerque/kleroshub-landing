import { NextResponse } from "next/server";

import { normalizeCartItems, type CartRequestItem } from "@/lib/products";
import { getStripeClient } from "@/lib/stripe";

type CheckoutRequestBody = {
  customerName?: unknown;
  customerEmail?: unknown;
  items?: unknown;
};

function isValidEmail(email: string) {
  return /^\S+@\S+\.\S+$/.test(email);
}

function getBaseUrl(request: Request) {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    request.headers.get("origin") ??
    "http://localhost:3000"
  ).replace(/\/$/, "");
}

export async function POST(request: Request) {
  let body: CheckoutRequestBody;

  try {
    body = (await request.json()) as CheckoutRequestBody;
  } catch {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const customerName = typeof body.customerName === "string" ? body.customerName.trim() : "";
  const customerEmail =
    typeof body.customerEmail === "string" ? body.customerEmail.trim().toLowerCase() : "";
  const requestItems = Array.isArray(body.items) ? (body.items as CartRequestItem[]) : [];
  const cartItems = normalizeCartItems(requestItems);

  if (!customerName) {
    return NextResponse.json({ error: "Nome é obrigatório." }, { status: 400 });
  }

  if (!isValidEmail(customerEmail)) {
    return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
  }

  if (cartItems.length === 0) {
    return NextResponse.json({ error: "Carrinho vazio." }, { status: 400 });
  }

  try {
    const stripe = getStripeClient();
    const baseUrl = getBaseUrl(request);
    const cartMetadata = JSON.stringify(
      cartItems.map(({ product, quantity }) => ({
        id: product.id,
        quantity,
      })),
    );
    const totalCents = cartItems.reduce(
      (sum, item) => sum + item.product.priceCents * item.quantity,
      0,
    );

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customerEmail,
      client_reference_id: customerEmail,
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
      metadata: {
        customerName,
        customerEmail,
        cart: cartMetadata,
        totalCents: String(totalCents),
      },
      line_items: cartItems.map(({ product, quantity }) => ({
        quantity,
        price_data: {
          currency: "brl",
          unit_amount: product.priceCents,
          product_data: {
            name: product.name,
            description: "Arquivo digital KlerosHub",
            images: [`${baseUrl}${product.image}`],
            metadata: {
              productId: product.id,
            },
          },
        },
      })),
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Não foi possível criar o checkout.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
