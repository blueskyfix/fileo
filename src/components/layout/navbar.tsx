import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/core/config/site";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-elevated/90 backdrop-blur">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-lg font-semibold tracking-tight text-foreground">
              {siteConfig.name}
            </span>
          </Link>

          <div className="hidden flex-1 items-center justify-center gap-6 md:flex">
            <Link href="/pdf" className="text-sm font-medium text-foreground-muted transition-colors hover:text-foreground">
              PDF
            </Link>
          </div>

          <Link
            href="/pdf/merge-pdf"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-[filter] hover:brightness-110"
          >
            Essayer gratuitement
          </Link>
        </nav>
      </Container>
    </header>
  );
}