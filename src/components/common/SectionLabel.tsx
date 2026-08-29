/**
 * 모노스페이스 대문자 + 한글 병기 섹션 라벨
 * @example <SectionLabel size="md">UPCOMING · 다가오는 여행</SectionLabel>
 */
export const SectionLabel = ({
  children,
  size = "sm",
  className = "",
}: {
  children: React.ReactNode;
  size?: "sm" | "md";
  className?: string;
}) => {
  const sizeClassName =
    size === "md" ? "text-[11px] tracking-section" : "text-[10px] tracking-label";

  return (
    <div className={`font-mono ${sizeClassName} text-muted ${className}`}>{children}</div>
  );
};
