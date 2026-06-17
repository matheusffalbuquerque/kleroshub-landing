type FooterLink = {
  label: string;
  href: string;
};

type FooterProps = {
  id?: string;
  brand: string;
  note: string;
  links: FooterLink[];
};

export function Footer({ id, brand, note, links }: FooterProps) {
  return (
    <footer id={id} className="min-h-52 bg-black text-white">
      <div className="tight-container grid gap-8 py-12 md:grid-cols-[1fr_auto] md:py-16">
        <div className="space-y-3">
          <p className="text-[21px] uppercase leading-none tracking-[-0.05em]" aria-label={brand}>
            <span className="font-black">KLEROS</span>
            <span className="font-light">HUB</span>
          </p>
          <p className="max-w-2xl text-sm leading-7 text-white/65">{note}</p>
        </div>
        <nav aria-label="Menu do rodape">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase text-white/72">
            {links.map((link) => (
              <li key={link.href}>
                <a className="transition hover:text-white" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <p className="tight-container py-4 text-center text-xs text-white/55">
          © KlerosHub - Talanta Tecnologia.
        </p>
      </div>
    </footer>
  );
}
