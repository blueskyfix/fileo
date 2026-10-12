"use client";

import { useTranslations } from "next-intl";
import { SELECTABLE_LEVELS, type SelectableLevel } from "../lib/levels";

interface CompressPdfOptionsProps {
  level: SelectableLevel;
  targetMb: string;
  onLevelChange: (level: SelectableLevel) => void;
  onTargetChange: (targetMb: string) => void;
}

export function CompressPdfOptions({
  level,
  targetMb,
  onLevelChange,
  onTargetChange,
}: CompressPdfOptionsProps) {
  const t = useTranslations("CompressPdf");

  return (
    <div className="flex flex-col gap-4">
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-sm font-medium text-foreground">{t("levelLabel")}</legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {SELECTABLE_LEVELS.map((option) => {
            const isActive = option === level;
            return (
              <label
                key={option}
                className={`flex cursor-pointer flex-col gap-1 rounded-xl border px-4 py-3 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-secondary ${
                  isActive
                    ? "border-primary bg-primary/10"
                    : "border-border bg-elevated hover:border-primary/40"
                }`}
              >
                <input
                  type="radio"
                  name="compress-pdf-level"
                  value={option}
                  checked={isActive}
                  onChange={() => onLevelChange(option)}
                  className="sr-only"
                />
                <span className={`text-sm font-medium ${isActive ? "text-primary" : "text-foreground"}`}>
                  {t(`levels.${option}.name`)}
                </span>
                <span className="text-xs text-foreground-muted">{t(`levels.${option}.description`)}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="flex flex-col gap-1">
        <label htmlFor="compress-pdf-target" className="text-sm font-medium text-foreground">
          {t("targetLabel")}
        </label>
        <div className="flex items-center gap-2">
          <input
            id="compress-pdf-target"
            type="number"
            inputMode="decimal"
            min="0.1"
            step="0.1"
            value={targetMb}
            onChange={(event) => onTargetChange(event.target.value)}
            placeholder="2"
            aria-describedby="compress-pdf-target-help"
            className="w-24 rounded-xl border border-border bg-elevated px-3 py-2 text-sm text-foreground"
          />
          <span className="text-sm text-foreground-muted">{t("targetUnit")}</span>
        </div>
        <p id="compress-pdf-target-help" className="text-xs text-foreground-muted">
          {t("targetHelp")}
        </p>
      </div>

      <p className="text-xs text-foreground-muted">{t("limitsNote")}</p>
    </div>
  );
}
