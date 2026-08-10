"use client";

interface QualitySliderProps {
  quality: number;
  onChange: (quality: number) => void;
}

export function QualitySlider({ quality, onChange }: QualitySliderProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <label htmlFor="quality" className="font-medium text-foreground">
          Qualité
        </label>
        <span className="text-foreground-muted">{quality}%</span>
      </div>
      <input
        id="quality"
        type="range"
        min={10}
        max={100}
        step={5}
        value={quality}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-border accent-primary"
      />
    </div>
  );
}