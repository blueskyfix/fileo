"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/core/config/site";
import { pdfTools } from "@/data/tools/tools";

export function Navbar() {
  const availableTools = pdfTools.filter((tool) => tool.status === "available");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-elevated/90 backdrop-blur">
      <Container>
        <nav className="flex h-16 items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="flex shrink-0 items-center justify-center rounded-lg p-2 text-foreground transition-colors hover:bg-unelevated md:hidden"
            aria-expanded={isMobileMenuOpen}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="/" className="flex shrink-0 items-center gap-2 md:mr-0">
            <Logo />
            <span className="text-lg font-semibold tracking-tight text-foreground">
              {siteConfig.name}
            </span>
          </Link>

          <div className="hidden flex-1 items-center justify-center gap-6 md:flex">
            {availableTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/pdf/${tool.slug}`}
                className="relative inline-block whitespace-nowrap py-1 text-sm font-medium text-foreground-muted transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-out hover:text-foreground hover:after:scale-x-100 motion-reduce:after:transition-none"
              >
                {tool.name}
              </Link>
            ))}

            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1 whitespace-nowrap py-1 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
                aria-expanded={isDropdownOpen}
              >
                Tous les outils
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-1/2 top-full mt-2 w-56 -translate-x-1/2 rounded-xl border border-border bg-elevated p-2 shadow-md">
                  {availableTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={tool.status === "available" ? `/pdf/${tool.slug}` : "/pdf"}
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-foreground-muted transition-colors hover:bg-unelevated hover:text-foreground"
                    >
                      {tool.name}
                      {tool.status !== "available" && (
                        <span className="rounded-full border border-border px-2 py-0.5 text-xs">
                          Bientôt
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Link
            href="/pdf/merge-pdf"
            className="hidden shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground/90 shadow-sm transition-all hover:bg-primary-hover hover:text-primary-foreground hover:shadow-md md:inline-block"
          >
            Essayer gratuitement
          </Link>

          <div className="w-9 md:hidden" aria-hidden="true" />
        </nav>
      </Container>

      {isMobileMenuOpen && (
        <div className="border-t border-border bg-elevated md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {availableTools.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.status === "available" ? `/pdf/${tool.slug}` : "/pdf"}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground-muted transition-colors hover:bg-unelevated hover:text-foreground"
              >
                {tool.name}
              </Link>
            ))}

            <Link
              href="/pdf/merge-pdf"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-3 rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground/90 shadow-sm transition-all hover:bg-primary-hover hover:text-primary-foreground"
            >
              Essayer gratuitement
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}