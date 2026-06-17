import Image from "next/image";
import { Globe2, Printer } from "lucide-react";

import { CartProvider } from "@/components/cart-provider";
import { FeaturesSection } from "@/components/features-section";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/product-card";
import { completePlanProducts, panoramaProducts } from "@/lib/products";

const navItems = [
  { label: "Materiais", href: "#materiais" },
  { label: "Quem Somos", href: "#quem-somos" },
  { label: "Planos", href: "#planos" },
  { label: "Panoramas", href: "#panoramas" },
  { label: "FAQ", href: "#faq" },
];

function SectionHeading({
  title,
  subtitle,
  description,
}: {
  title: string;
  subtitle?: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-4xl text-center text-black">
      <h2 className="display-title text-5xl leading-[0.92] md:text-7xl">{title}</h2>
      {subtitle ? <p className="mt-2 text-base md:text-lg">{subtitle}</p> : null}
      {description ? (
        <p className="mx-auto mt-2 max-w-3xl text-sm leading-5 md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default function Home() {
  return (
    <CartProvider>
      <Header logo="KLEROSHUB" items={navItems} />
      <main className="bg-white text-black">
        <section id="inicio" className="bg-[var(--color-soft)]">
          <div className="relative mx-auto min-h-[420px] w-full overflow-hidden md:min-h-[520px]">
            <Image
              src="/capa.png"
              alt="Plano Bíblico Completo com capas coloridas sobre mesa clara"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        </section>

        <FeaturesSection />

        <section id="materiais" className="bg-black py-7 text-white">
          <div className="tight-container flex flex-col items-center justify-center gap-6 md:flex-row md:gap-20">
            <a
              href="#planos"
              className="inline-flex h-16 min-w-[260px] items-center justify-center gap-4 rounded-xl border border-white/70 px-6 transition hover:bg-white hover:text-black"
            >
              <Printer size={42} strokeWidth={2.4} />
              <span className="display-title text-3xl leading-none">Arquivo para impressão</span>
            </a>
            <a
              href="#panoramas"
              className="inline-flex h-16 min-w-[260px] items-center justify-center gap-4 rounded-xl border border-white/70 px-6 transition hover:bg-white hover:text-black"
            >
              <Globe2 size={42} strokeWidth={2.2} />
              <span className="display-title text-3xl leading-none">Arquivo Online</span>
            </a>
          </div>
        </section>

        <section id="planos" className="bg-white py-14 md:py-20">
          <div className="tight-container">
            <SectionHeading
              title="Diversidade de temas"
              subtitle="Escolha o tema da sua preferência, uma capa para cada gosto!"
              description="O plano bíblico completo - 12 meses, é um companheiro para a sua leitura bíblia diária, com task de marcações de capítulos"
            />
            <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-5 md:gap-7">
              {completePlanProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-12 md:py-16">
          <div className="tight-container text-center">
            <SectionHeading
              title="Plano bíblico - Ordem Cronológica"
              description="Nosso painel centraliza as informações essenciais para que você gaste menos tempo com planilhas e mais tempo com pessoas."
            />
            <div className="mx-auto mt-5 flex max-w-xl flex-wrap justify-center gap-2">
              {[
                "Checklist Diário",
                "Tema Geral dos capítulos",
                "Nota Informativa",
                "Leitura em 12 meses",
                "Leitura em 5 meses",
              ].map((label) => (
                <span key={label} className="bg-black px-3 py-1 text-xs text-white">
                  {label}
                </span>
              ))}
            </div>
            <a
              href="#materiais"
              className="mt-5 inline-flex h-10 min-w-40 items-center justify-center rounded-xl bg-[var(--color-red)] px-8 text-sm font-black uppercase text-white transition hover:bg-red-700"
            >
              Ver agora
            </a>
            <div className="relative mt-12 aspect-[1323/594] overflow-hidden border border-black/30 bg-white">
              <Image
                src="/parte3.png"
                alt="Detalhes do Plano Bíblico Cronológico"
                fill
                className="object-contain"
                sizes="1180px"
              />
            </div>
          </div>
        </section>

        <section id="panoramas" className="bg-white py-14 md:py-20">
          <div className="tight-container max-w-5xl">
            <div className="relative aspect-[1387/837] overflow-hidden bg-neutral-100">
              <Image
                src="/Frame 12.png"
                alt="Panorama Bíblico com página impressa e destaque circular"
                fill
                className="object-cover"
                sizes="1000px"
              />
            </div>
            <div className="mx-auto mt-12 max-w-4xl text-sm leading-6 md:text-base">
              <p>
                A Trilha de Caminhada é o roteiro estratégico do seu devocional. Ela{" "}
                <strong>
                  <em>organiza a sua jornada no tempo</em>
                </strong>
                , indicando exatamente em qual estágio você está.
              </p>
              <ul className="mt-6 list-disc space-y-5 pl-5">
                <li>
                  <strong>O que é:</strong> Uma sequência cronológica que elimina a
                  indecisão de por onde começar.
                </li>
                <li>
                  <strong>O objetivo:</strong> Dar ritmo e constância para que cada dia
                  seja um passo fundamental até a leitura completa.
                </li>
              </ul>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-7">
              {panoramaProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-white py-14 md:py-20">
          <div className="tight-container grid items-center gap-10 md:grid-cols-[0.95fr_1.05fr]">
            <div className="text-center md:col-span-2">
              <h2 className="display-title text-5xl leading-[0.95] md:text-6xl">
                Conheça nosso sistema de
                <br />
                organização para a sua igreja.
              </h2>
            </div>
            <div className="relative mx-auto aspect-[1.1/1] w-full max-w-md">
              <div className="absolute inset-x-[14%] bottom-[8%] h-[18%] skew-x-[-18deg] bg-black/18 blur-[1px]" />
              <div className="absolute left-[8%] top-[10%] h-[62%] w-[78%] rotate-[-13deg] border border-black/10 bg-neutral-200 shadow-2xl">
                <div className="m-[3%] h-[94%] overflow-hidden rounded-sm bg-white">
                  <div className="h-5 bg-blue-100" />
                  <div className="grid grid-cols-[42px_1fr]">
                    <div className="h-56 bg-orange-500" />
                    <div className="p-4">
                      <div className="mb-5 h-5 w-28 rounded bg-neutral-200" />
                      <div className="grid grid-cols-3 gap-3">
                        {Array.from({ length: 9 }).map((_, index) => (
                          <span
                            key={index}
                            className="h-10 rounded bg-[var(--color-purple)]"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-[28%] h-[18%] w-[42%] bg-neutral-300" />
              <div className="absolute bottom-0 left-[18%] h-[3%] w-[62%] rounded-full bg-neutral-400" />
            </div>
            <div className="mx-auto max-w-md md:mx-0">
              <h3 className="display-title text-4xl leading-[0.9] text-[var(--color-purple)] md:text-5xl">
                Sua igreja conectada
                <br />
                em um só lugar.
              </h3>
              <p className="mt-8 text-2xl font-black leading-6">
                Organize escalas, registre visitantes e gerencie departamentos{" "}
                <span className="font-medium">sem complicações.</span>
              </p>
              <p className="mt-5 text-sm font-medium leading-5">
                Kleros é um ecossistema moderno e completo para igrejas:{" "}
                <strong>
                  cultos, eventos, membros, grupos e finanças, com gráficos, agenda,
                  notificações e relatórios.
                </strong>
              </p>
              <a
                href="#inicio"
                className="mt-6 inline-flex h-10 min-w-56 items-center justify-center rounded-full bg-[var(--color-purple)] px-8 text-sm font-bold text-white transition hover:bg-black"
              >
                Explorar recursos
              </a>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 text-center md:py-20">
          <h2 className="text-3xl font-black tracking-[-0.04em] md:text-4xl">
            Pronto para organizar e integrar sua igreja?
          </h2>
          <p className="mt-2 text-xl md:text-2xl">
            Assine por <strong>R$79/mês</strong> e receba seu subdomínio imediatamente.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#inicio"
              className="inline-flex h-11 min-w-56 items-center justify-center rounded-xl bg-[var(--color-purple)] px-8 text-white transition hover:bg-black"
            >
              Agendar demonstração
            </a>
            <a
              href="#materiais"
              className="inline-flex h-11 min-w-56 items-center justify-center rounded-xl bg-neutral-900 px-8 text-white transition hover:bg-[var(--color-purple)]"
            >
              Conhecer mais
            </a>
          </div>
        </section>
      </main>
      <Footer
        id="contato"
        brand="KLEROSHUB"
        note="Planos bíblicos, panoramas e ferramentas digitais para organizar a rotina de leitura e a gestão da igreja."
        links={navItems}
      />
    </CartProvider>
  );
}
