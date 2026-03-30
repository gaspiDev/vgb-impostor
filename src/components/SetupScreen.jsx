import { useState } from "react";
import Card from "./Card";
import Button from "./Button";

export default function SetupScreen({ onStartGame }) {
  const [playerCount, setPlayerCount] = useState(3);
  const [players, setPlayers] = useState(
    Array.from({ length: 3 }, (_, i) => `Player ${i + 1}`)
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
            (_, i) => `Player ${prev.length + i + 1}`
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
        <h1 className="text-3xl font-bold">Impostor</h1>
        <p className="text-gray-500">Set up your game</p>

        <div className="flex items-center justify-center gap-4">
          <button
            className="w-12 h-12 rounded-full bg-gray-200 text-2xl font-bold"
            onClick={() => updatePlayerCount(playerCount - 1)}
          >
            -
          </button>
          <span className="text-2xl font-semibold w-20 text-center">
            {playerCount}
          </span>
          <button
            className="w-12 h-12 rounded-full bg-gray-200 text-2xl font-bold"
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
              placeholder={`Player ${i + 1}`}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-black"
            />
          ))}
        </div>

        <Button onClick={() => onStartGame(players)} disabled={!canStart}>
          Start Game
        </Button>
      </div>
    </Card>
  );
}
