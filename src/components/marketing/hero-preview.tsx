import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pdfTools, getToolIcon } from "@/data/tools/tools";


export function HeroPreview() {
    const heroSlugs = [
      "merge-pdf",
      "jpg-to-pdf",
      "pdf-to-jpg",
      "split-pdf",
      "remove-pages",
      "pdf-to-word",
    ];
    const availableTools = pdfTools.filter((tool) => tool.status === "available");
  return (
    <div className="rounded-xl border border-border bg-elevated p-4 shadow-sm md:p-5">
      <div className="grid grid-cols-2 gap-3">
        {pdfTools
          .filter((tool) => heroSlugs.includes(tool.slug))
          .map((tool) => {
          const Icon = getToolIcon(tool.icon);
          const isAvailable = tool.status === "available";

          const content = (
            <>
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg md:h-9 md:w-9 ${
                  isAvailable
                    ? "bg-primary/10 text-primary"
                    : "bg-unelevated text-foreground-muted"
                }`}
              >
                <Icon className="h-5 w-5 md:h-4 md:w-4" />
              </div>
              <span
                className={`text-sm font-medium leading-tight ${
                  isAvailable ? "text-foreground" : "text-foreground-muted"
                }`}
              >
                {tool.name}
              </span>
              {!isAvailable && (
                <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-foreground-muted md:ml-auto">
                  Bientôt
                </span>
              )}
            </>
          );

          const className =
            "group flex flex-col items-center gap-2 rounded-lg border border-border bg-surface px-3 py-4 text-center transition-colors md:flex-row md:gap-3 md:py-3 md:text-left" +
            (isAvailable
              ? " hover:border-primary active:border-primary"
              : " cursor-not-allowed opacity-70");

          return isAvailable ? (
            <Link key={tool.slug} href={tool.href} className={className}>
              {content}
            </Link>
          ) : (
            <div key={tool.slug} className={className}>
              {content}
            </div>
          );
        })}
      </div>

      <Link
        href="/pdf"
        className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-border bg-surface py-2.5 text-sm font-medium text-foreground-muted transition-colors hover:bg-unelevated hover:text-foreground"
      >
        Voir tous les outils
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  );
}