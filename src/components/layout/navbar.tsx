import Link from "next/link";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/core/config/site";

const navItems = [{ label: "PDF", href: "/pdf" }];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-elevated bg-surface/90 backdrop-blur">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-lg font-medium tracking-tight text-foreground"
          >
            {siteConfig.name}
          </Link>

          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}