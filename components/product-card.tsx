"use client";

import Image from "next/image";
import { Search, ShoppingCart } from "lucide-react";

import { useCart } from "@/components/cart-provider";
import { formatCurrency, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const discount = Math.round(
    ((product.compareAtCents - product.priceCents) / product.compareAtCents) * 10000,
  ) / 100;

  return (
    <article className="min-w-0 text-black">
      <h3 className="mb-2 truncate text-[11px] font-medium md:text-xs">{product.name}</h3>
      <div className="relative aspect-[318/415] overflow-hidden bg-neutral-100">
        <span className="absolute left-0 top-0 z-10 bg-white px-1.5 py-1 text-[8px] font-semibold text-red-600">
          {product.badge}
        </span>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="220px"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-black/45 py-2 text-xs text-white">
          Pré-visualização <Search size={13} strokeWidth={2.4} />
        </div>
      </div>
      <div className="mt-2 bg-neutral-200 py-1 text-center text-[10px] font-medium">
        Arquivo Digital
      </div>
      <div className="mt-2 inline-flex bg-neutral-100 px-2 py-1 text-[8px] font-bold uppercase">
        {product.details}
      </div>
      <p className="mt-2 text-[11px] leading-tight">
        De <span className="line-through">{formatCurrency(product.compareAtCents)}</span>{" "}
        <span className="font-semibold text-red-600">-{discount}%</span>
      </p>
      <p className="text-xs leading-tight">Por apenas</p>
      <p className="text-3xl font-black tracking-[-0.04em]">
        {formatCurrency(product.priceCents)}
      </p>
      <button
        type="button"
        onClick={() => addItem(product.id)}
        className="mt-2 inline-flex h-8 items-center gap-1 rounded-md bg-[var(--color-red)] px-3 text-[11px] font-bold text-white transition hover:bg-red-700"
      >
        <ShoppingCart size={13} /> Adicionar ao carrinho
      </button>
    </article>
  );
}
