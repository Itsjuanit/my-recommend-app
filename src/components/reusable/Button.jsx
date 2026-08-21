const VARIANTS = {
  primary:
    "bg-acid text-void hover:shadow-[0_0_28px_rgba(212,252,121,0.38)] disabled:opacity-50 disabled:shadow-none",
  ghost:
    "border border-line text-dim hover:border-acid hover:text-acid disabled:opacity-50",
};

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`label-tech inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 transition-all disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
