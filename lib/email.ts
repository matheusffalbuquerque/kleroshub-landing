import { Resend } from "resend";

import { formatCurrency } from "@/lib/products";

type PurchasedItem = {
  name: string;
  quantity: number;
  amountTotalCents: number;
};

type PurchaseEmailPayload = {
  customerName: string;
  customerEmail: string;
  items: PurchasedItem[];
  totalCents: number;
  sessionId: string;
};

const internalNotificationEmail = "notificacoes@kleros.app";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  return new Resend(apiKey);
}

function getFromEmail() {
  return process.env.RESEND_FROM_EMAIL ?? "KlerosHub <noreply@kleros.app>";
}

function renderItemsList(items: PurchasedItem[]) {
  return items
    .map(
      (item) =>
        `<li><strong>${item.quantity}x ${escapeHtml(item.name)}</strong> - ${formatCurrency(
          item.amountTotalCents,
        )}</li>`,
    )
    .join("");
}

export async function sendPurchaseEmails(payload: PurchaseEmailPayload) {
  const resend = getResendClient();
  const itemsHtml = renderItemsList(payload.items);
  const total = formatCurrency(payload.totalCents);
  const customerName = escapeHtml(payload.customerName);
  const customerEmail = escapeHtml(payload.customerEmail);
  const sessionId = escapeHtml(payload.sessionId);

  await Promise.all([
    resend.emails.send({
      from: getFromEmail(),
      to: [internalNotificationEmail],
      subject: `Nova compra KlerosHub - ${payload.customerName}`,
      html: `
        <h1>Nova compra aprovada</h1>
        <p><strong>Nome:</strong> ${customerName}</p>
        <p><strong>E-mail:</strong> ${customerEmail}</p>
        <p><strong>Total:</strong> ${total}</p>
        <p><strong>Stripe Session:</strong> ${sessionId}</p>
        <h2>Produtos</h2>
        <ul>${itemsHtml}</ul>
      `,
    }),
    resend.emails.send({
      from: getFromEmail(),
      to: [payload.customerEmail],
      subject: "Compra confirmada - KlerosHub",
      html: `
        <h1>Compra confirmada</h1>
        <p>Olá, ${customerName}.</p>
        <p>Recebemos o pagamento da sua compra na KlerosHub.</p>
        <h2>Produtos comprados</h2>
        <ul>${itemsHtml}</ul>
        <p><strong>Total:</strong> ${total}</p>
        <p>Em breve você receberá as orientações de acesso aos arquivos digitais.</p>
      `,
    }),
  ]);
}
