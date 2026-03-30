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
          <p className="text-woods/70 text-lg">
            Pasa el telefono a
          </p>
          <h2 className="text-2xl font-bold">{players[currentTurn]}</h2>
          <Button onClick={() => setRevealed(true)}>Revelar</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex flex-col gap-6 items-center">
        {isImpostor ? (
          <>
            <p className="text-impostor text-lg font-semibold">Eres el</p>
            <h2 className="text-3xl font-bold text-impostor drop-shadow-[0_0_12px_rgba(224,122,95,0.5)]">
              Impostor!
            </h2>
            <div className="bg-impostor/15 rounded-xl p-4 w-full">
              <p className="text-woods/60 text-sm">Pista</p>
              <p className="text-lg font-medium">{hint}</p>
            </div>
          </>
        ) : (
          <>
            <p className="text-woods/60 text-sm uppercase tracking-wide">
              {category}
            </p>
            <h2 className="text-3xl font-bold">{word}</h2>
          </>
        )}

        <Button onClick={handleNext}>
          {isLastPlayer ? "Comenzar Discusion" : "Siguiente Jugador"}
        </Button>
      </div>
    </Card>
  );
}
