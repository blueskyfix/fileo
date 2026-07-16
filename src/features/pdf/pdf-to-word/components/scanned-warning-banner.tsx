interface ScannedWarningBannerProps {
  onContinueAnyway: () => void;
}

export function ScannedWarningBanner({
  onContinueAnyway,
}: ScannedWarningBannerProps) {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
      <p className="text-sm text-[#0F172A]">
        Ce PDF semble contenir peu ou pas de texte sélectionnable — il s&apos;agit
        probablement d&apos;un document scanné. La conversion basique risque de
        produire un fichier Word vide ou incomplet.
      </p>
      <p className="mt-1 text-sm text-[#64748B]">
        La reconnaissance de texte (OCR) pour les documents scannés arrive
        bientôt.
      </p>
      <button
        type="button"
        onClick={onContinueAnyway}
        className="mt-3 rounded-xl border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-medium text-[#0F172A] hover:bg-[#F1F5F9]"
      >
        Continuer quand même
      </button>
    </div>
  );
}