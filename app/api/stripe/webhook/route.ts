import { NextResponse } from "next/server";
import Stripe from "stripe";

import { sendPurchaseEmails } from "@/lib/email";
import { getProductById } from "@/lib/products";
import { getStripeClient } from "@/lib/stripe";

export const runtime = "nodejs";

type MetadataCartItem = {
  id: string;
  quantity: number;
};

function parseMetadataCart(cart?: string) {
  if (!cart) {
    return [];
  }

  try {
    const parsed = JSON.parse(cart) as MetadataCartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function handleCompletedCheckout(session: Stripe.Checkout.Session) {
  const stripe = getStripeClient();
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 100,
  });
  const metadataCart = parseMetadataCart(session.metadata?.cart);

  const purchasedItems = lineItems.data.map((lineItem, index) => {
    const metadataProduct = metadataCart[index]
      ? getProductById(metadataCart[index].id)
      : undefined;
    const quantity = lineItem.quantity ?? metadataCart[index]?.quantity ?? 1;

    return {
      name: lineItem.description ?? metadataProduct?.name ?? "Produto KlerosHub",
      quantity,
      amountTotalCents:
        lineItem.amount_total ??
        (metadataProduct ? metadataProduct.priceCents * quantity : 0),
    };
  });

  await sendPurchaseEmails({
    customerName: session.metadata?.customerName ?? "Cliente KlerosHub",
    customerEmail: session.customer_details?.email ?? session.metadata?.customerEmail ?? "",
    items: purchasedItems,
    totalCents:
      session.amount_total ??
      purchasedItems.reduce((sum, item) => sum + item.amountTotalCents, 0),
    sessionId: session.id,
  });
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Webhook signature or secret is not configured." },
      { status: 400 },
    );
  }

  const body = await request.text();
  const stripe = getStripeClient();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid webhook signature.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    await handleCompletedCheckout(event.data.object);
  }

  return NextResponse.json({ received: true });
}
