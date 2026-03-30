import Card from "./Card";
import Button from "./Button";

export default function EndScreen({ impostorName, word, category, onRestart }) {
  return (
    <Card>
      <div className="flex flex-col gap-6 items-center">
        <h2 className="text-2xl font-bold">Game Over</h2>

        <div className="w-full flex flex-col gap-3">
          <div className="bg-red-50 rounded-xl p-4">
            <p className="text-gray-500 text-sm">The Impostor was</p>
            <p className="text-xl font-bold text-red-500">{impostorName}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-gray-500 text-sm">{category}</p>
            <p className="text-xl font-bold">{word}</p>
          </div>
        </div>

        <Button onClick={onRestart}>Play Again</Button>
      </div>
    </Card>
  );
}
