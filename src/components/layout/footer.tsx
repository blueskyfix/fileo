import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/core/config/site";
import { pdfTools } from "@/data/tools/tools";

const footerLinks = [
  { label: "Confidentialité", href: "/privacy" },
  { label: "Conditions d'utilisation", href: "/terms" },
  { label: "Support", href: "/support" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col gap-3 sm:col-span-2 md:col-span-1">
            <Logo />
            <p className="max-w-xs text-sm text-foreground-muted">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">
              Outils PDF
            </p>
            <ul className="flex flex-col gap-2.5">
              {pdfTools.map((tool) => (
                <li key={tool.slug}>
                  {tool.status === "available" ? (
                    <Link
                      href={`/pdf/${tool.slug}`}
                      className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                    >
                      {tool.name}
                    </Link>
                  ) : (
                    <span className="flex items-center gap-2 text-sm text-foreground-muted/60">
                      {tool.name}
                      <span className="rounded-full border border-border px-2 py-0.5 text-xs">
                        Bientôt
                      </span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">
              Fileo
            </p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="/pdf"
                  className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                >
                  Tous les outils PDF
                </Link>
              </li>
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-sm text-foreground-muted">
          © {new Date().getFullYear()} {siteConfig.name}
        </div>
      </Container>
    </footer>
  );
}