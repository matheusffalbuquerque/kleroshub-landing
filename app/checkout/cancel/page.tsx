import Link from "next/link";
import { XCircle } from "lucide-react";

export default function CheckoutCancelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 text-black">
      <section className="max-w-xl text-center">
        <XCircle className="mx-auto text-red-600" size={58} strokeWidth={2} />
        <h1 className="mt-6 text-4xl font-black tracking-[-0.05em]">
          Compra não finalizada
        </h1>
        <p className="mt-4 text-base leading-7 text-black/65">
          O pagamento foi cancelado ou interrompido. Você pode voltar para a página e
          tentar novamente.
        </p>
        <Link
          href="/#planos"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-black px-8 text-sm font-bold uppercase text-white transition hover:bg-[var(--color-red)]"
        >
          Voltar aos produtos
        </Link>
      </section>
    </main>
  );
}
