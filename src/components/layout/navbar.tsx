"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/core/config/site";
import {
  pdfTools,
  getToolsByCategory,
  toolCategoryLabels,
  type Tool,
} from "@/data/tools/tools";

type DropdownKey = "convert" | "organize" | "all";

export function Navbar() {
  const mainTools = getToolsByCategory("main");
  const convertTools = getToolsByCategory("convert");
  const organizeTools = getToolsByCategory("organize");

  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  function toggleDropdown(key: DropdownKey) {
    setOpenDropdown((prev) => (prev === key ? null : key));
  }

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

          <div ref={navRef} className="hidden flex-1 items-center justify-center gap-6 md:flex">
            {mainTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/pdf/${tool.slug}`}
                className="relative inline-block whitespace-nowrap py-1 text-sm font-medium text-foreground-muted transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-out hover:text-foreground hover:after:scale-x-100 motion-reduce:after:transition-none"
              >
                {tool.name}
              </Link>
            ))}

            <NavDropdown
              label="Convertir"
              tools={convertTools}
              isOpen={openDropdown === "convert"}
              onToggle={() => toggleDropdown("convert")}
              onClose={() => setOpenDropdown(null)}
            />

            <NavDropdown
              label="Organiser"
              tools={organizeTools}
              isOpen={openDropdown === "organize"}
              onToggle={() => toggleDropdown("organize")}
              onClose={() => setOpenDropdown(null)}
            />

            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown("all")}
                className="flex items-center gap-1 whitespace-nowrap py-1 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
                aria-expanded={openDropdown === "all"}
              >
                Tous les outils
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    openDropdown === "all" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openDropdown === "all" && (
                <div className="absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2 rounded-xl border border-border bg-elevated p-2 shadow-md">
                  {pdfTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={tool.status === "available" ? `/pdf/${tool.slug}` : "/pdf"}
                      onClick={() => setOpenDropdown(null)}
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
            href="/pdf"
            className="hidden shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground/90 shadow-sm transition-all hover:bg-primary-hover hover:text-primary-foreground hover:shadow-md md:inline-block"
          >
            Essayer gratuitement
          </Link>

          <div className="w-9 md:hidden" aria-hidden="true" />
        </nav>
      </Container>

      {isMobileMenuOpen && (
        <div className="border-t border-border bg-elevated md:hidden">
          <Container className="flex flex-col gap-5 py-4">
            <MobileGroup label={toolCategoryLabels.main} tools={mainTools} onNavigate={() => setIsMobileMenuOpen(false)} />
            <MobileGroup label={toolCategoryLabels.convert} tools={convertTools} onNavigate={() => setIsMobileMenuOpen(false)} />
            <MobileGroup label={toolCategoryLabels.organize} tools={organizeTools} onNavigate={() => setIsMobileMenuOpen(false)} />

            <Link
              href="/pdf"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium text-primary"
            >
              Voir tous les outils →
            </Link>

            <Link
              href="/pdf/merge-pdf"
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground/90 shadow-sm transition-all hover:bg-primary-hover hover:text-primary-foreground"
            >
              Essayer gratuitement
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}

function NavDropdown({
  label,
  tools,
  isOpen,
  onToggle,
  onClose,
}: {
  label: string;
  tools: Tool[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  if (tools.length === 0) return null;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-1 whitespace-nowrap py-1 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-1/2 top-full mt-2 w-56 -translate-x-1/2 rounded-xl border border-border bg-elevated p-2 shadow-md">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/pdf/${tool.slug}`}
              onClick={onClose}
              className="flex items-center rounded-lg px-3 py-2 text-sm text-foreground-muted transition-colors hover:bg-unelevated hover:text-foreground"
            >
              {tool.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileGroup({
  label,
  tools,
  onNavigate,
}: {
  label: string;
  tools: Tool[];
  onNavigate: () => void;
}) {
  if (tools.length === 0) return null;

  return (
    <div className="flex flex-col gap-1">
      <p className="px-3 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
        {label}
      </p>
      {tools.map((tool) => (
        <Link
          key={tool.slug}
          href={`/pdf/${tool.slug}`}
          onClick={onNavigate}
          className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground-muted transition-colors hover:bg-unelevated hover:text-foreground"
        >
          {tool.name}
        </Link>
      ))}
    </div>
  );
}