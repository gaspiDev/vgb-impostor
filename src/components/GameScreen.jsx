import { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";

export default function GameScreen({ onEnd }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const time = `${minutes}:${secs.toString().padStart(2, "0")}`;

  return (
    <Card>
      <div className="flex flex-col gap-6 items-center">
        <h2 className="text-2xl font-bold">Hora de Discutir</h2>
        <p className="text-woods/70 text-lg">
          Hablen, pregunten y encuentren al impostor!
        </p>
        <div className="text-5xl font-mono font-bold tabular-nums">{time}</div>
        <Button onClick={onEnd} variant="danger">
          Terminar Partida
        </Button>
      </div>
    </Card>
  );
}
