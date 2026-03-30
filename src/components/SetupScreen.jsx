import { useState } from "react";
import Card from "./Card";
import Button from "./Button";

export default function SetupScreen({ onStartGame }) {
  const [playerCount, setPlayerCount] = useState(3);
  const [players, setPlayers] = useState(
    Array.from({ length: 3 }, (_, i) => `Jugador ${i + 1}`)
  );

  function updatePlayerCount(count) {
    const clamped = Math.max(3, Math.min(10, count));
    setPlayerCount(clamped);
    setPlayers((prev) => {
      if (clamped > prev.length) {
        return [
          ...prev,
          ...Array.from(
            { length: clamped - prev.length },
            (_, i) => `Jugador ${prev.length + i + 1}`
          ),
        ];
      }
      return prev.slice(0, clamped);
    });
  }

  function updateName(index, name) {
    setPlayers((prev) => prev.map((p, i) => (i === index ? name : p)));
  }

  const canStart = players.every((name) => name.trim().length > 0);

  return (
    <Card>
      <div className="flex flex-col gap-6">
        <div className="bg-woods rounded-2xl py-3 px-4 -mx-1">
          <h1 className="text-3xl font-bold text-moss">Impostor</h1>
        </div>
        <p className="text-woods/70">Configura tu partida</p>

        <div className="flex items-center justify-center gap-4">
          <button
            className="w-12 h-12 rounded-full bg-woods/10 text-2xl font-bold text-woods cursor-pointer hover:bg-woods/20 transition-colors"
            onClick={() => updatePlayerCount(playerCount - 1)}
          >
            -
          </button>
          <span className="text-2xl font-semibold w-20 text-center">
            {playerCount}
          </span>
          <button
            className="w-12 h-12 rounded-full bg-woods/10 text-2xl font-bold text-woods cursor-pointer hover:bg-woods/20 transition-colors"
            onClick={() => updatePlayerCount(playerCount + 1)}
          >
            +
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {players.map((name, i) => (
            <input
              key={i}
              type="text"
              value={name}
              onChange={(e) => updateName(i, e.target.value)}
              placeholder={`Jugador ${i + 1}`}
              className="w-full border border-woods/20 bg-moss rounded-xl px-4 py-3 text-lg text-woods placeholder-woods/40 focus:outline-none focus:border-canopy"
            />
          ))}
        </div>

        <Button onClick={() => onStartGame(players)} disabled={!canStart}>
          Iniciar Partida
        </Button>
      </div>
    </Card>
  );
}
