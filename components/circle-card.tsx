import Image from "next/image";

type CircleCardProps = {
  /** Caminho ou URL da imagem exibida dentro do círculo */
  imageSrc: string;
  imageAlt: string;
  /** Conteúdo de texto exibido ao lado do círculo */
  children: React.ReactNode;
  /** Posição do texto em relação ao círculo */
  textSide?: "left" | "right";
  /** Tamanho do círculo em px (padrão: 220) */
  size?: number;
};

export function CircleCard({
  imageSrc,
  imageAlt,
  children,
  textSide = "right",
  size = 220,
}: CircleCardProps) {
  return (
    <div
      className={`flex items-center gap-8 ${
        textSide === "left" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Círculo com borda decorativa lateral */}
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        {/* Arco decorativo de borda — posicionado na lateral oposta ao texto */}
        <span
          className={`absolute inset-0 rounded-full border-[6px] border-transparent ${
            textSide === "right"
              ? "border-l-black"
              : "border-r-black"
          }`}
          style={{ borderRadius: "50%" }}
          aria-hidden
        />

        {/* Círculo principal com imagem */}
        <div
          className="relative overflow-hidden rounded-full border-4 border-black"
          style={{ width: size, height: size }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Texto lateral */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
