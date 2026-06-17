"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

type HeaderItem = {
  label: string;
  href: string;
};

type HeaderProps = {
  logo: string;
  items: HeaderItem[];
};

export function Header({ logo, items }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-black text-white">
      <div className="mx-auto flex h-11 w-[min(calc(100%-2rem),790px)] items-center justify-between">
        <a
          href="#inicio"
          className="shrink-0 text-[24px] uppercase leading-none tracking-[-0.05em]"
          aria-label={logo}
          onClick={() => setIsOpen(false)}
        >
          <span className="font-black">KLEROS</span>
          <span className="font-light">HUB</span>
        </a>
        <nav aria-label="Menu principal" className="ml-14 hidden flex-1 md:flex">
          <ul className="flex w-full items-center justify-between text-xs font-medium uppercase text-white">
            {items.map((item) => (
              <li key={item.href}>
                <a className="block whitespace-nowrap transition hover:text-white/65" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center md:hidden"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {isOpen ? (
        <nav className="border-t border-white/10 bg-black md:hidden" aria-label="Menu mobile">
          <ul className="tight-container grid gap-1 py-3 text-sm font-semibold uppercase">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  className="block py-3"
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
