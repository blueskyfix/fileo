import Link from "next/link";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/core/config/site";

const footerLinks = [
  { label: "Confidentialité", href: "/privacy" },
  { label: "Conditions d'utilisation", href: "/terms" },
  { label: "Support", href: "/support" },
];

export function Footer() {
  return (
    <footer className="border-t border-elevated">
      <Container className="flex flex-col gap-4 py-8 text-sm text-foreground/60 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>

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