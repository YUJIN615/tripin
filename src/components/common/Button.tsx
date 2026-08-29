type ButtonProps = {
  children: React.ReactNode;
  /** primary: 강조 채움 · secondary: 흰 배경 테두리 */
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

/**
 * 높이 50px, 라운드 14px의 기본 버튼
 */
export const Button = ({
  children,
  variant = "primary",
  type = "button",
  disabled = false,
  className = "",
  onClick,
}: ButtonProps) => {
  const variantClassName =
    variant === "primary"
      ? "bg-accent text-white text-[15px] shadow-cta disabled:bg-muted/50 disabled:shadow-none"
      : "bg-white border border-line text-muted text-sm disabled:text-muted/50";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`h-[50px] rounded-group font-bold transition-colors disabled:cursor-not-allowed ${variantClassName} ${className}`}
    >
      {children}
    </button>
  );
};
