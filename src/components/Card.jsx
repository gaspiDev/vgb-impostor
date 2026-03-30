export default function Card({ children }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-sm">
      {children}
    </div>
  );
}
