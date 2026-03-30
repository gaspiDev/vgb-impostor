export default function Card({ children }) {
  return (
    <div className="bg-bark border border-canopy/20 rounded-3xl shadow-lg shadow-black/30 p-6 w-full max-w-sm text-moss-light h-full">
      {children}
    </div>
  );
}
