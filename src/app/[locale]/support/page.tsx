import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Support",
  description: "Besoin d'aide avec FileoPDF ? Contactez-nous.",
};

export default function SupportPage() {
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Support
        </h1>
        <p className="mt-4 text-foreground-muted">
          Une question, un bug, ou une suggestion ? On est là pour aider.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          
           <a href="mailto:contact@fileopdf.app"
            className="flex items-center gap-3 rounded-lg border border-border bg-elevated p-5 transition-colors hover:border-primary"
            >
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">
                contact@fileopdf.app
              </p>
              <p className="text-sm text-foreground-muted">
                Réponse généralement sous 48h
              </p>
            </div>
          </a>

          <p className="text-sm text-foreground-muted">
            Pour les questions les plus courantes sur Merge PDF, consultez
            aussi la{" "}
            <Link
              href="/pdf/merge-pdf#faq"
              className="text-primary hover:underline"
            >
              FAQ de l&apos;outil
            </Link>
            .
          </p>
        </div>
      </div>
    </Container>
  );
}