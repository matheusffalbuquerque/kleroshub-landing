export type ProductCategory = "complete-plan" | "panorama";

export type Product = {
  id: string;
  name: string;
  image: string;
  category: ProductCategory;
  priceCents: number;
  compareAtCents: number;
  badge: string;
  details: string;
};

export type CartRequestItem = {
  productId: string;
  quantity: number;
};

const DEFAULT_PRICE_CENTS = 998;
const DEFAULT_COMPARE_AT_CENTS = 1498;

export const products = [
  {
    id: "plano-completo-aurora",
    name: "Plano Completo - Aurora",
    image: "/Frame 35.png",
    category: "complete-plan",
    priceCents: DEFAULT_PRICE_CENTS,
    compareAtCents: DEFAULT_COMPARE_AT_CENTS,
    badge: "Economia de R$5 OFF",
    details: "23 páginas / completo",
  },
  {
    id: "plano-completo-sofia",
    name: "Plano Completo - Sofia",
    image: "/Frame 36.png",
    category: "complete-plan",
    priceCents: DEFAULT_PRICE_CENTS,
    compareAtCents: DEFAULT_COMPARE_AT_CENTS,
    badge: "Economia de R$5 OFF",
    details: "23 páginas / completo",
  },
  {
    id: "plano-completo-boreal",
    name: "Plano Completo - Boreal",
    image: "/Frame 37.png",
    category: "complete-plan",
    priceCents: DEFAULT_PRICE_CENTS,
    compareAtCents: DEFAULT_COMPARE_AT_CENTS,
    badge: "Economia de R$5 OFF",
    details: "23 páginas / completo",
  },
  {
    id: "plano-completo-lily",
    name: "Plano Completo - Lily",
    image: "/Frame 39.png",
    category: "complete-plan",
    priceCents: DEFAULT_PRICE_CENTS,
    compareAtCents: DEFAULT_COMPARE_AT_CENTS,
    badge: "Economia de R$5 OFF",
    details: "23 páginas / completo",
  },
  {
    id: "plano-completo-rose",
    name: "Plano Completo - Rosê",
    image: "/Frame 38.png",
    category: "complete-plan",
    priceCents: DEFAULT_PRICE_CENTS,
    compareAtCents: DEFAULT_COMPARE_AT_CENTS,
    badge: "Economia de R$5 OFF",
    details: "23 páginas / completo",
  },
  {
    id: "panorama-biblico-sofia",
    name: "Panorama Bíblico - Sofia",
    image: "/Frame 49.png",
    category: "panorama",
    priceCents: DEFAULT_PRICE_CENTS,
    compareAtCents: DEFAULT_COMPARE_AT_CENTS,
    badge: "Economia de R$5 OFF",
    details: "Arquivo digital",
  },
  {
    id: "panorama-biblico-boreal",
    name: "Panorama Bíblico - Boreal",
    image: "/Frame 50.png",
    category: "panorama",
    priceCents: DEFAULT_PRICE_CENTS,
    compareAtCents: DEFAULT_COMPARE_AT_CENTS,
    badge: "Economia de R$5 OFF",
    details: "Arquivo digital",
  },
  {
    id: "panorama-biblico-aurora",
    name: "Panorama Bíblico - Aurora",
    image: "/Frame 52.png",
    category: "panorama",
    priceCents: DEFAULT_PRICE_CENTS,
    compareAtCents: DEFAULT_COMPARE_AT_CENTS,
    badge: "Economia de R$5 OFF",
    details: "Arquivo digital",
  },
  {
    id: "panorama-biblico-rose",
    name: "Panorama Bíblico - Rosê",
    image: "/Frame 53.png",
    category: "panorama",
    priceCents: DEFAULT_PRICE_CENTS,
    compareAtCents: DEFAULT_COMPARE_AT_CENTS,
    badge: "Economia de R$5 OFF",
    details: "Arquivo digital",
  },
] satisfies Product[];

export const completePlanProducts = products.filter(
  (product) => product.category === "complete-plan",
);

export const panoramaProducts = products.filter(
  (product) => product.category === "panorama",
);

export function getProductById(productId: string) {
  return products.find((product) => product.id === productId);
}

export function formatCurrency(cents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}

export function normalizeCartItems(items: CartRequestItem[]) {
  const grouped = new Map<string, number>();

  for (const item of items) {
    if (!item || typeof item.productId !== "string") {
      continue;
    }

    const quantity = Number.isInteger(item.quantity) ? item.quantity : 0;
    if (quantity < 1) {
      continue;
    }

    grouped.set(item.productId, (grouped.get(item.productId) ?? 0) + quantity);
  }

  return Array.from(grouped.entries())
    .map(([productId, quantity]) => {
      const product = getProductById(productId);
      return product ? { product, quantity: Math.min(quantity, 20) } : null;
    })
    .filter((item): item is { product: Product; quantity: number } => item !== null);
}
