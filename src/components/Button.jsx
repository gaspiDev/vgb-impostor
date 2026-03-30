export default function Button({ children, onClick, disabled, variant = "primary" }) {
  const base = "rounded-2xl py-4 px-8 text-xl w-full font-semibold transition-opacity";
  const variants = {
    primary: "bg-black text-white",
    secondary: "bg-gray-200 text-black",
    danger: "bg-red-500 text-white",
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
