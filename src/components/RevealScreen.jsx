import { useState } from "react";
import Card from "./Card";
import Button from "./Button";

export default function RevealScreen({
  players,
  currentTurn,
  impostorIndex,
  word,
  hint,
  category,
  onNext,
}) {
  const [revealed, setRevealed] = useState(false);
  const isImpostor = currentTurn === impostorIndex;
  const isLastPlayer = currentTurn === players.length - 1;

  function handleNext() {
    setRevealed(false);
    onNext();
  }

  if (!revealed) {
    return (
      <Card>
        <div className="flex flex-col gap-6 items-center">
          <p className="text-gray-500 text-lg">
            Pass the phone to
          </p>
          <h2 className="text-2xl font-bold">{players[currentTurn]}</h2>
          <Button onClick={() => setRevealed(true)}>Tap to Reveal</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex flex-col gap-6 items-center">
        {isImpostor ? (
          <>
            <p className="text-red-500 text-lg font-semibold">You are the</p>
            <h2 className="text-3xl font-bold text-red-500">Impostor!</h2>
            <div className="bg-red-50 rounded-xl p-4 w-full">
              <p className="text-gray-500 text-sm">Hint</p>
              <p className="text-lg font-medium">{hint}</p>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 text-sm uppercase tracking-wide">
              {category}
            </p>
            <h2 className="text-3xl font-bold">{word}</h2>
          </>
        )}

        <Button onClick={handleNext}>
          {isLastPlayer ? "Start Discussion" : "Next Player"}
        </Button>
      </div>
    </Card>
  );
}
