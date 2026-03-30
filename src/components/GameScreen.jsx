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
        <h2 className="text-2xl font-bold text-moss-light">Hora de hablar</h2>
        <p className="text-moss-light/70 text-lg">
          Cada uno dice una palabra y al finalizar se vota para expulsar al impostor <br></br><b>o no...!</b>
        </p>
        <div className="text-5xl font-arcade text-canopy text-glow tabular-nums">{time}</div>
        <Button onClick={onEnd} variant="danger">
          Terminar Partida
        </Button>
      </div>
    </Card >
  );
}
