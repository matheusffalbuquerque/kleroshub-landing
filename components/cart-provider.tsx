"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";

import { formatCurrency, getProductById, type CartRequestItem } from "@/lib/products";

type CartContextValue = {
  items: CartRequestItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  openCart: () => void;
  totalItems: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "kleroshub-cart";

function sanitizeItems(items: CartRequestItem[]) {
  return items
    .map((item) => ({
      productId: item.productId,
      quantity: Math.min(Math.max(item.quantity, 1), 20),
    }))
    .filter((item) => getProductById(item.productId));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartRequestItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [error, setError] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setItems(sanitizeItems(JSON.parse(stored)));
        }
      } catch {
        setItems([]);
      } finally {
        setHasLoaded(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [hasLoaded, items]);

  const detailedItems = useMemo(
    () =>
      items
        .map((item) => {
          const product = getProductById(item.productId);
          return product ? { product, quantity: item.quantity } : null;
        })
        .filter((item): item is NonNullable<typeof item> => item !== null),
    [items],
  );

  const totalItems = detailedItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCents = detailedItems.reduce(
    (sum, item) => sum + item.product.priceCents * item.quantity,
    0,
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem: (productId) => {
        setItems((current) => {
          const existing = current.find((item) => item.productId === productId);
          if (existing) {
            return current.map((item) =>
              item.productId === productId
                ? { ...item, quantity: Math.min(item.quantity + 1, 20) }
                : item,
            );
          }

          return [...current, { productId, quantity: 1 }];
        });
        setIsOpen(true);
      },
      removeItem: (productId) => {
        setItems((current) => current.filter((item) => item.productId !== productId));
      },
      updateQuantity: (productId, quantity) => {
        setItems((current) =>
          current
            .map((item) =>
              item.productId === productId
                ? { ...item, quantity: Math.min(Math.max(quantity, 1), 20) }
                : item,
            )
            .filter((item) => item.quantity > 0),
        );
      },
      openCart: () => setIsOpen(true),
      totalItems,
    }),
    [items, totalItems],
  );

  async function handleCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!customerName.trim()) {
      setError("Informe seu nome para continuar.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(customerEmail)) {
      setError("Informe um e-mail válido.");
      return;
    }

    if (items.length === 0) {
      setError("Adicione pelo menos um produto ao carrinho.");
      return;
    }

    setIsCheckingOut(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim(),
          items,
        }),
      });

      const payload = (await response.json()) as {
        sessionId?: string;
        url?: string;
        error?: string;
      };

      if (!response.ok || !payload.url) {
        throw new Error(payload.error ?? "Não foi possível iniciar o pagamento.");
      }

      window.location.assign(payload.url);
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Não foi possível iniciar o pagamento.",
      );
      setIsCheckingOut(false);
    }
  }

  return (
    <CartContext.Provider value={value}>
      {children}
      <button
        type="button"
        className="fixed bottom-5 right-5 z-40 inline-flex h-14 min-w-14 items-center justify-center gap-2 rounded-full bg-black px-5 text-sm font-bold text-white shadow-2xl transition hover:bg-[var(--color-red)]"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir carrinho"
      >
        <ShoppingCart size={20} />
        {totalItems > 0 ? <span>{totalItems}</span> : null}
      </button>

      <div
        className={`fixed inset-0 z-50 transition ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <div
          className={`absolute inset-0 bg-black/45 transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white text-black shadow-2xl transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="Carrinho de compras"
        >
          <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
            <div>
              <p className="text-xs font-bold uppercase text-black/45">Carrinho</p>
              <h2 className="text-2xl font-black tracking-[-0.04em]">
                Sua compra
              </h2>
            </div>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 transition hover:bg-neutral-200"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar carrinho"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5">
            {detailedItems.length === 0 ? (
              <div className="rounded-lg border border-dashed border-black/20 p-6 text-center">
                <p className="text-sm font-semibold">Seu carrinho está vazio.</p>
                <p className="mt-2 text-xs leading-5 text-black/55">
                  Escolha um plano ou panorama e clique em adicionar ao carrinho.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {detailedItems.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="grid grid-cols-[64px_1fr] gap-3 border-b border-black/10 pb-4"
                  >
                    <div className="relative aspect-[318/415] overflow-hidden bg-neutral-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-bold leading-4">{product.name}</h3>
                          <p className="mt-1 text-xs text-black/55">
                            {formatCurrency(product.priceCents)}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="text-black/45 transition hover:text-[var(--color-red)]"
                          onClick={() => value.removeItem(product.id)}
                          aria-label={`Remover ${product.name}`}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full border border-black/15">
                          <button
                            type="button"
                            className="inline-flex h-8 w-8 items-center justify-center"
                            onClick={() => value.updateQuantity(product.id, quantity - 1)}
                            aria-label="Diminuir quantidade"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="min-w-8 text-center text-sm font-bold">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            className="inline-flex h-8 w-8 items-center justify-center"
                            onClick={() => value.updateQuantity(product.id, quantity + 1)}
                            aria-label="Aumentar quantidade"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="text-sm font-black">
                          {formatCurrency(product.priceCents * quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleCheckout} className="border-t border-black/10 p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-bold uppercase text-black/55">Total</span>
              <strong className="text-3xl tracking-[-0.05em]">
                {formatCurrency(totalCents)}
              </strong>
            </div>
            <label className="block text-xs font-bold uppercase text-black/60">
              Nome
              <input
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                className="mt-1 h-11 w-full rounded-md border border-black/15 px-3 text-sm font-medium normal-case outline-none focus:border-black"
                placeholder="Seu nome"
                autoComplete="name"
              />
            </label>
            <label className="mt-3 block text-xs font-bold uppercase text-black/60">
              E-mail
              <input
                value={customerEmail}
                onChange={(event) => setCustomerEmail(event.target.value)}
                className="mt-1 h-11 w-full rounded-md border border-black/15 px-3 text-sm font-medium normal-case outline-none focus:border-black"
                placeholder="voce@email.com"
                autoComplete="email"
                inputMode="email"
              />
            </label>
            {error ? <p className="mt-3 text-sm font-semibold text-red-600">{error}</p> : null}
            <button
              type="submit"
              disabled={isCheckingOut || detailedItems.length === 0}
              className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-lg bg-[var(--color-red)] px-5 text-sm font-black uppercase text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
            >
              {isCheckingOut ? "Abrindo pagamento..." : "Finalizar compra"}
            </button>
            <p className="mt-3 text-center text-[11px] leading-4 text-black/45">
              Pagamento seguro processado pela Stripe.
            </p>
          </form>
        </aside>
      </div>
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
