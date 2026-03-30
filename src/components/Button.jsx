export default function Button({ children, onClick, disabled, variant = "primary" }) {
  const base = "rounded-2xl py-4 px-8 text-xl w-full font-semibold transition-colors cursor-pointer";
  const variants = {
    primary: "bg-canopy hover:bg-canopy-hover text-white",
    secondary: "bg-sierra/30 text-woods hover:bg-sierra/40",
    danger: "bg-impostor text-white hover:bg-impostor/90",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
