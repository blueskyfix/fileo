import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/core/config/site";
import { getToolsByCategory, toolCategoryLabels, type Tool } from "@/data/tools/tools";

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("Footer");
  const mainTools = getToolsByCategory("main");
  const convertTools = getToolsByCategory("convert");
  const organizeTools = getToolsByCategory("organize");

  const legalLinks = [
    { label: t("allPdfTools"), href: "/pdf" },
    { label: t("privacy"), href: "/privacy" },
    { label: t("terms"), href: "/terms" },
    { label: t("support"), href: "/support" },
  ];

  return (
    <footer className="border-t border-border">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-5">
          <div className="flex flex-col gap-3 sm:col-span-2 md:col-span-1">
            <Logo />
            <p className="max-w-xs text-sm text-foreground-muted">
              {siteConfig.description}
            </p>
          </div>

          <FooterColumn title={toolCategoryLabels.main} tools={mainTools} locale={locale} />
          <FooterColumn title={toolCategoryLabels.convert} tools={convertTools} locale={locale} />
          <FooterColumn title={toolCategoryLabels.organize} tools={organizeTools} locale={locale} />

          <div>
            <p className="mb-3 text-base font-bold text-foreground">Fileo</p>
            <ul className="flex flex-col gap-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-base font-medium text-foreground-muted transition-colors hover:text-foreground"
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

function FooterColumn({
  title,
  tools,
  locale,
}: {
  title: string;
  tools: Tool[];
  locale: string;
}) {
  if (tools.length === 0) return null;

  return (
    <div>
      <p className="mb-3 text-base font-bold text-foreground">{title}</p>
      <ul className="flex flex-col gap-2.5">
        {tools.map((tool) => (
          <li key={tool.slug}>
            <Link
              href={`/${locale}${tool.href}`}
              className="text-base font-medium text-foreground-muted transition-colors hover:text-foreground"
            >
              {tool.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}