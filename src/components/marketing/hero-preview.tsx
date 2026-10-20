"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, File, FileText, Image as ImageIcon, Lock } from "lucide-react";
import { pdfTools, getToolIcon, getToolLabel, type Tool } from "@/data/tools/tools";
import { NotifyMeModal } from "@/features/pdf/shared/components/notify-me-modal";
import type { AppLocale } from "@/i18n/routing";

const heroSlugs = [
  "merge-pdf",
  "jpg-to-pdf",
  "pdf-to-jpg",
  "split-pdf",
  "pdf-to-word",
  "remove-pages",
];

export function HeroPreview() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("ToolCard");
  const [notifyTool, setNotifyTool] = useState<Tool | null>(null);

  return (
    <>
      {/* Mobile — grille de liens directs vers les outils (pas de "Outils populaires" sur mobile) */}
      <div className="rounded-xl border border-border bg-elevated p-4 shadow-sm md:hidden">
        <div className="grid grid-cols-2 gap-3">
          {pdfTools
            .filter((tool) => heroSlugs.includes(tool.slug))
            .map((tool) => {
              const Icon = getToolIcon(tool.icon);
              const isAvailable = tool.status === "available";
              const { name } = getToolLabel(tool.slug, locale);

              const content = (
                <>
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                      isAvailable
                        ? "bg-primary/10 text-primary"
                        : "bg-unelevated text-foreground-muted"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <span
                      className={`block text-sm font-medium leading-tight ${
                        isAvailable ? "text-foreground" : "text-foreground-muted"
                      }`}
                    >
                      {name}
                    </span>
                    {!isAvailable && (
                      <span className="mt-1 inline-block rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-foreground-muted">
                        {t("comingSoon")}
                      </span>
                    )}
                  </div>
                </>
              );

              const className =
                "group flex flex-col items-center gap-2 rounded-lg border border-border bg-surface px-3 py-4 text-center transition-colors" +
                (isAvailable
                  ? " hover:border-primary active:border-primary"
                  : " cursor-pointer hover:border-primary");

              if (isAvailable) {
                return (
                  <Link key={tool.slug} href={tool.href} className={className}>
                    {content}
                  </Link>
                );
              }

              return (
                <button
                  key={tool.slug}
                  type="button"
                  onClick={() => setNotifyTool(tool)}
                  className={className}
                >
                  {content}
                </button>
              );
            })}
        </div>

        <Link
          href="/pdf"
          className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-border bg-surface py-2.5 text-sm font-medium text-foreground-muted transition-colors hover:bg-unelevated hover:text-foreground"
        >
          {t("viewAllTools")}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Desktop — illustration décorative (Outils populaires prend le relais en dessous, pas de doublon) */}
      <div
        aria-hidden="true"
        className="relative mx-auto hidden h-80 w-full max-w-md items-center justify-center md:flex"
      >
        {/* Mockup fenêtre navigateur — centré via inset-0 + m-auto */}
        <div className="absolute inset-0 m-auto h-64 w-full max-w-sm rounded-2xl border border-border bg-surface/70 shadow-sm">
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-border" />
            <span className="h-2 w-2 rounded-full bg-border" />
            <span className="h-2 w-2 rounded-full bg-border" />
          </div>
        </div>

        {/* Halo de profondeur */}
        <div className="absolute inset-0 m-auto h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

        {/* Groupe des 3 tuiles — flex avec chevauchement, z-index explicite */}
        <div className="relative flex items-center">
          <div className="relative z-0 flex h-28 w-28 -rotate-12 translate-y-4 -mr-6 flex-col items-center justify-center gap-1 rounded-2xl border border-border bg-elevated shadow-md transition-transform duration-300 hover:-translate-y-0 hover:rotate-0">
            <FileText className="h-[3.25rem] w-[3.25rem] text-primary" strokeWidth={1.5} />
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-primary">
              DOC
            </span>
          </div>

          <div className="relative z-10 flex h-40 w-40 flex-col items-center justify-center gap-1.5 rounded-2xl border border-border bg-elevated shadow-lg transition-transform duration-300 hover:-translate-y-1">
            <File className="h-[4.5rem] w-[4.5rem] text-primary" strokeWidth={1.5} />
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold tracking-wide text-primary">
              PDF
            </span>
          </div>

          <div className="relative z-0 flex h-28 w-28 rotate-12 translate-y-4 -ml-6 flex-col items-center justify-center gap-1 rounded-2xl border border-border bg-elevated shadow-md transition-transform duration-300 hover:-translate-y-0 hover:rotate-0">
            <ImageIcon className="h-[3.25rem] w-[3.25rem] text-primary" strokeWidth={1.5} />
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-primary">
              IMG
            </span>
          </div>
        </div>

        {/* Badge confidentialité — ancré sur le coin du cadre */}
        <div className="absolute bottom-4 right-4 z-20 flex h-14 w-14 items-center justify-center rounded-full border-4 border-surface bg-primary text-primary-foreground shadow-md">
          <Lock className="h-7 w-7" />
        </div>
      </div>

      {notifyTool && (
        <NotifyMeModal
          toolSlug={notifyTool.slug}
          toolName={getToolLabel(notifyTool.slug, locale).name}
          onClose={() => setNotifyTool(null)}
        />
      )}
    </>
  );
}