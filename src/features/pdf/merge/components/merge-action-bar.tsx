export function MergeActionBar() {
  return (
    <div className="flex justify-end">
      <button
        type="button"
        disabled
        className="rounded-lg bg-accent px-6 py-3 text-sm font-medium text-accent-foreground opacity-40 disabled:cursor-not-allowed"
      >
        Fusionner les PDF
      </button>
    </div>
  );
}