import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 text-black">
      <section className="max-w-xl text-center">
        <CheckCircle2 className="mx-auto text-green-600" size={58} strokeWidth={2} />
        <h1 className="mt-6 text-4xl font-black tracking-[-0.05em]">
          Pagamento confirmado
        </h1>
        <p className="mt-4 text-base leading-7 text-black/65">
          Obrigado pela compra. Você receberá a confirmação no e-mail informado durante
          o checkout.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-black px-8 text-sm font-bold uppercase text-white transition hover:bg-[var(--color-red)]"
        >
          Voltar para a KlerosHub
        </Link>
      </section>
    </main>
  );
}
