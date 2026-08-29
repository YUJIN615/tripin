"use client";

type ChipTone = "accent" | "badge";

type ChipProps = {
  label: string;
  selected?: boolean;
  /** 선택 시 채움색 — accent(강조 채움) 또는 badge(연한 배지) */
  tone?: ChipTone;
  onClick?: () => void;
};

/**
 * 선택형 칩 — 여행 장소 / 컨셉 / 이동 수단
 */
export const Chip = ({ label, selected = false, tone = "accent", onClick }: ChipProps) => {
  const selectedClassName =
    tone === "badge" ? "bg-badge text-ink font-bold" : "bg-accent text-white font-bold";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`px-3.5 py-2 rounded-chip text-sm transition-colors ${
        selected ? selectedClassName : "bg-white border border-line text-chip hover:border-accent"
      }`}
    >
      {label}
    </button>
  );
};
