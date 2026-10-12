import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import {
  FileStack,
  Scissors,
  FileMinus,
  ImagePlus,
  FileImage,
  FileType,
  RotateCw,
  Minimize2,
  FileUp,
  ArrowRight,
} from "lucide-react";
import type { CSSProperties } from "react";
import { cn } from "@/core/utils/cn";
import { FormatBadge } from "@/components/ui/format-badge";
import { formatTint, getToolFormat } from "@/data/tools/formats";
import { getToolLabel, type Tool } from "@/data/tools/tools";
import type { AppLocale } from "@/i18n/routing";

const icons = {
  merge: FileStack,
  split: Scissors,
  "remove-pages": FileMinus,
  "jpg-to-pdf": FileImage,
  "pdf-to-jpg": ImagePlus,
  "pdf-to-word": FileType,
  "rotate-pdf": RotateCw,
  "compress-image": Minimize2,
  "word-to-pdf": FileUp,
} as const;

export async function ToolCard({
  tool,
  locale,
}: {
  tool: Tool;
  locale: AppLocale;
}) {
  const Icon = icons[tool.icon];
  const isAvailable = tool.status === "available";
  const { name, description } = getToolLabel(tool.slug, locale);
  const t = await getTranslations({ locale, namespace: "ToolCard" });
  const format = getToolFormat(tool.slug);

  const content = (
    <div
      style={{ "--tool-color": format.color } as CSSProperties}
      className={cn(
        // Liseré gauche de 3 px dans la couleur du format principal (charte v2, §5.5).
        "group relative flex h-full flex-col gap-2 overflow-hidden rounded-xl border border-border bg-elevated p-5 transition duration-200 ease-out before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-(--tool-color) sm:gap-4 sm:p-6",
        isAvailable
          ? "hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0"
          : "opacity-60",
      )}
    >
      <div className="flex items-center justify-between">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-[10px]"
          style={{ backgroundColor: formatTint(format.color), color: format.color }}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        </div>
        {!isAvailable && (
          <span className="rounded-lg border border-border px-2 py-0.5 text-xs text-foreground-muted">
            {t("comingSoon")}
          </span>
        )}
      </div>

      <div className="flex-1">
        <h3 className="text-base font-semibold text-foreground">{name}</h3>
        <p className="mt-1 hidden text-sm text-foreground-muted sm:block">
          {description}
        </p>
      </div>

      {format.tags.length > 0 && (
        <div className="hidden flex-wrap gap-1.5 sm:flex">
          {format.tags.map((tag) => (
            <FormatBadge key={tag.label} label={tag.label} color={tag.color} />
          ))}
        </div>
      )}

      {isAvailable && (
        <span className="hidden items-center gap-1 text-sm font-semibold text-primary sm:flex">
          {t("openTool")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      )}
    </div>
  );

  if (!isAvailable) {
    return <div aria-disabled="true">{content}</div>;
  }

  return (
    <Link href={tool.href} className="block h-full">
      {content}
    </Link>
  );
}