import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/core/config/site";

const footerLinks = [
  { label: "Confidentialité", href: "/privacy" },
  { label: "Conditions d'utilisation", href: "/terms" },
  { label: "Support", href: "/support" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-4 py-8 text-sm text-foreground-muted md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <span>
            © {new Date().getFullYear()} {siteConfig.name}
          </span>
        </div>

        <ul className="flex flex-wrap gap-4">
          {footerLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-foreground">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}