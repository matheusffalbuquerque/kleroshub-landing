import Image from "next/image";

type Feature = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: React.ReactNode;
  imagePosition?: string;
};

const features: Feature[] = [
  {
    imageSrc: "/Frame 13.png",
    imageAlt: "Trilha de Caminhada",
    title: "Trilha",
    description: (
      <>
        A trilha de
        <br />
        caminhada te
        <br />
        permite
        <br />
        marcar os
        <br />
        <strong className="font-semibold italic">dias de leitura</strong>
        <br />
        <strong className="font-semibold italic">de cada mês.</strong>
      </>
    ),
    imagePosition: "center",
  },
  {
    imageSrc: "/Frame 12.png",
    imageAlt: "Panorama de livros da bíblia",
    title: "Panorama",
    description: (
      <>
        Uma visão
        <br />
        geral de cada
        <br />
        livro da bíblia,
        <br />
        com
        <br />
        curiosidades e
        <br />
        informações
        <br />
        importantes.
      </>
    ),
    imagePosition: "52% center",
  },
  {
    imageSrc: "/Frame 27.png",
    imageAlt: "Task — marcação de capítulos",
    title: "Task",
    description: (
      <>
        Marcação de
        <br />
        cada <strong className="font-semibold italic">capítulo</strong>
        <br />
        <strong className="font-semibold italic">já lido</strong>
      </>
    ),
    imagePosition: "center",
  },
  {
    imageSrc: "/Frame 40.png",
    imageAlt: "Divisão por trimestres",
    title: "Divisão",
    description: (
      <>
        O plano é
        <br />
        dividido por
        <br />
        <strong className="font-semibold italic">trimestres</strong>
      </>
    ),
    imagePosition: "center",
  },
];

function CircleFeatureCard({
  imageSrc,
  imageAlt,
  title,
  description,
  imagePosition,
}: Feature) {
  return (
    <div className="mx-auto grid w-full max-w-[390px] items-center gap-4 sm:grid-cols-[174px_1fr] md:max-w-none">
      <div className="relative mx-auto h-[168px] w-[168px] shrink-0 md:h-[174px] md:w-[174px]">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            borderWidth: 8,
            borderStyle: "solid",
            borderLeftColor: "#111",
            borderTopColor: "#111",
            borderRightColor: "transparent",
            borderBottomColor: "transparent",
          }}
          aria-hidden
        />
        <div className="absolute inset-[7px] overflow-hidden rounded-full bg-gray-100">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            style={{ objectPosition: imagePosition }}
            sizes="174px"
          />
        </div>
      </div>

      <div className="flex-1">
        <h3 className="display-title text-[36px] leading-[0.82] text-black md:text-[40px]">
          {title}
        </h3>
        <p className="mt-2 max-w-[150px] text-[16px] font-light leading-[1.03] tracking-[-0.01em] text-black/78 md:text-[17px]">
          {description}
        </p>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section id="quem-somos" className="bg-white py-14 md:py-16">
      <div className="mx-auto w-[min(calc(100%-2rem),880px)]">
        <h2 className="mb-9 text-center font-[family-name:var(--font-hand)] text-[48px] font-normal leading-none tracking-[0.01em] text-black md:text-[52px]">
          Nele você encontrará&nbsp;...
        </h2>

        <div className="mx-auto grid max-w-[850px] gap-x-16 gap-y-10 md:grid-cols-2">
          {features.map((feature) => (
            <CircleFeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
