export default function Button({ children, onClick, disabled, variant = "primary" }) {
  const base = "rounded-2xl py-4 px-8 text-xl w-full font-bold uppercase tracking-wide transition-colors cursor-pointer";
  const variants = {
    primary: "bg-canopy hover:bg-canopy-hover text-woods",
    secondary: "bg-bark text-moss-light hover:bg-bark/80 border border-mist/30",
    danger: "bg-impostor text-white hover:bg-impostor/90",
  };

  function handleClick(e) {
    if (disabled) return;
    new Audio("/sounds/minecraft-click.mp3").play();
    onClick?.(e);
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
