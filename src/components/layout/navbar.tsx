"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { siteConfig } from "@/core/config/site";
import {
  tools,
  getToolsByCategory,
  toolCategoryLabels,
  type Tool,
} from "@/data/tools/tools";

type DropdownKey = "convert" | "organize" | "all";

export function Navbar() {
  const locale = useLocale();
  const t = useTranslations("Nav");
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
            aria-label={t("menu")}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href={`/${locale}`} className="flex shrink-0 items-center gap-2 md:mr-0">
            <Logo />
            <span className="text-lg font-semibold tracking-tight text-foreground">
              {siteConfig.name}
            </span>
          </Link>

          <div ref={navRef} className="hidden flex-1 items-center justify-center gap-6 md:flex">
            {mainTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${locale}${tool.status === "available" ? tool.href : "/pdf"}`}
                className="relative inline-block whitespace-nowrap py-1 text-sm font-medium text-foreground-muted transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-out hover:text-foreground hover:after:scale-x-100 motion-reduce:after:transition-none"
              >
                {tool.name}
              </Link>
            ))}

            <NavDropdown
              label={t("convert")}
              tools={convertTools}
              locale={locale}
              isOpen={openDropdown === "convert"}
              onToggle={() => toggleDropdown("convert")}
              onClose={() => setOpenDropdown(null)}
            />

            <NavDropdown
              label={t("organize")}
              tools={organizeTools}
              locale={locale}
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
                {t("allTools")}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    openDropdown === "all" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openDropdown === "all" && (
                <div className="absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2 rounded-xl border border-border bg-elevated p-2 shadow-md">
                  {tools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/${locale}${tool.status === "available" ? tool.href : "/pdf"}`}
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-foreground-muted transition-colors hover:bg-unelevated hover:text-foreground"
                    >
                      {tool.name}
                      {tool.status !== "available" && (
                        <span className="rounded-full border border-border px-2 py-0.5 text-xs">
                          {t("comingSoon")}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="hidden shrink-0 items-center gap-4 md:flex">
            <LanguageSwitcher />
            <Link
              href={`/${locale}/pdf`}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground/90 shadow-sm transition-all hover:bg-primary-hover hover:text-primary-foreground hover:shadow-md"
            >
              {t("tryFree")}
            </Link>
          </div>

          <div className="w-9 md:hidden" aria-hidden="true" />
        </nav>
      </Container>

      {isMobileMenuOpen && (
        <div className="border-t border-border bg-elevated md:hidden">
          <Container className="flex flex-col gap-5 py-4">
            <MobileGroup label={toolCategoryLabels.main} tools={mainTools} locale={locale} onNavigate={() => setIsMobileMenuOpen(false)} />
            <MobileGroup label={toolCategoryLabels.convert} tools={convertTools} locale={locale} onNavigate={() => setIsMobileMenuOpen(false)} />
            <MobileGroup label={toolCategoryLabels.organize} tools={organizeTools} locale={locale} onNavigate={() => setIsMobileMenuOpen(false)} />

            <Link
              href={`/${locale}/pdf`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium text-primary"
            >
              {t("seeAllTools")}
            </Link>

            <LanguageSwitcher />

            <Link
              href={`/${locale}/pdf/merge-pdf`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground/90 shadow-sm transition-all hover:bg-primary-hover hover:text-primary-foreground"
            >
              {t("tryFree")}
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
  locale,
  isOpen,
  onToggle,
  onClose,
}: {
  label: string;
  tools: Tool[];
  locale: string;
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
              href={`/${locale}${tool.status === "available" ? tool.href : "/pdf"}`}
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
  locale,
  onNavigate,
}: {
  label: string;
  tools: Tool[];
  locale: string;
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
          href={`/${locale}${tool.status === "available" ? tool.href : "/pdf"}`}
          onClick={onNavigate}
          className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground-muted transition-colors hover:bg-unelevated hover:text-foreground"
        >
          {tool.name}
        </Link>
      ))}
    </div>
  );
}