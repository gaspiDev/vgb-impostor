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
        <h2 className="text-2xl font-bold">Discussion Time</h2>
        <p className="text-gray-500 text-lg">
          Talk, question, and find the impostor!
        </p>
        <div className="text-5xl font-mono font-bold tabular-nums">{time}</div>
        <Button onClick={onEnd} variant="danger">
          End Game
        </Button>
      </div>
    </Card>
  );
}
