import { useState } from "react";
import { CATEGORIES } from "./data/words";
import { pickRandomCategory, pickRandomWord, pickImpostorIndex } from "./utils/game";
import SetupScreen from "./components/SetupScreen";
import RevealScreen from "./components/RevealScreen";
import GameScreen from "./components/GameScreen";
import EndScreen from "./components/EndScreen";

const INITIAL_STATE = {
  phase: "setup",
  players: [],
  category: null,
  word: null,
  hint: null,
  impostorIndex: null,
  currentTurn: 0,
};

export default function App() {
  const [game, setGame] = useState(INITIAL_STATE);

  function onStartGame(players) {
    const category = pickRandomCategory(CATEGORIES);
    const { word, hint } = pickRandomWord(category);
    const impostorIndex = pickImpostorIndex(players.length);
    setGame({
      phase: "reveal",
      players,
      category: category.name,
      word,
      hint,
      impostorIndex,
      currentTurn: 0,
    });
  }

  function onNextTurn() {
    if (game.currentTurn >= game.players.length - 1) {
      setGame((prev) => ({ ...prev, phase: "game" }));
    } else {
      setGame((prev) => ({ ...prev, currentTurn: prev.currentTurn + 1 }));
    }
  }

  function onEndGame() {
    setGame((prev) => ({ ...prev, phase: "end" }));
  }

  function onRestart() {
    setGame(INITIAL_STATE);
  }

  return (
    <div className="min-h-screen bg-moss flex flex-col items-center justify-center p-4 text-woods">
      {game.phase === "setup" && <SetupScreen onStartGame={onStartGame} />}

      {game.phase === "reveal" && (
        <RevealScreen
          players={game.players}
          currentTurn={game.currentTurn}
          impostorIndex={game.impostorIndex}
          word={game.word}
          hint={game.hint}
          category={game.category}
          onNext={onNextTurn}
        />
      )}

      {game.phase === "game" && <GameScreen onEnd={onEndGame} />}

      {game.phase === "end" && (
        <EndScreen
          impostorName={game.players[game.impostorIndex]}
          word={game.word}
          category={game.category}
          onRestart={onRestart}
        />
      )}
    </div>
  );
}
