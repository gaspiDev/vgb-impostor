export default function Card({ children }) {
  return (
    <div className="bg-sierra rounded-3xl shadow-lg shadow-woods/15 p-6 w-full max-w-sm text-woods">
      {children}
    </div>
  );
}
