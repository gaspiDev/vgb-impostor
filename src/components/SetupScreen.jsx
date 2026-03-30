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
        <p className="text-moss-light/70">Configura tu partida</p>

        <div className="flex items-center justify-center gap-4">
          <button
            className="w-12 h-12 rounded-full bg-moss-light/10 text-2xl font-bold text-moss-light cursor-pointer hover:bg-moss-light/20 transition-colors"
            onClick={() => updatePlayerCount(playerCount - 1)}
          >
            -
          </button>
          <span className="text-2xl font-semibold w-20 text-center text-moss-light">
            {playerCount}
          </span>
          <button
            className="w-12 h-12 rounded-full bg-moss-light/10 text-2xl font-bold text-moss-light cursor-pointer hover:bg-moss-light/20 transition-colors"
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
              className="w-full border border-moss-light/20 bg-woods rounded-xl px-4 py-3 text-lg text-moss-light placeholder-moss-light/40 focus:outline-none focus:border-canopy"
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
