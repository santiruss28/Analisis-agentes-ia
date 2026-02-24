"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Agentes IA" },
  { href: "/precios", label: "Precios CRM" },
  { href: "/kanban", label: "Kanban CRM" },
  { href: "/chatbot-builders", label: "Bot Builders" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-center gap-6 mb-8 p-4 bg-bg-secondary rounded-xl border border-border flex-wrap">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`font-semibold text-sm transition-colors duration-300 no-underline ${
            pathname === link.href
              ? "text-accent-cyan"
              : "text-text-secondary hover:text-accent-cyan"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
