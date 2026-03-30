import { useState, useRef } from "react";
import { CATEGORIES } from "./data/words";
import { pickRandomCategory, pickRandomWord, pickImpostorIndex } from "./utils/game";
import HomeScreen from "./components/HomeScreen";
import SetupScreen from "./components/SetupScreen";
import RevealScreen from "./components/RevealScreen";
import GameScreen from "./components/GameScreen";
import EndScreen from "./components/EndScreen";

const INITIAL_STATE = {
  phase: "home",
  players: [],
  category: null,
  word: null,
  hint: null,
  impostorIndex: null,
  currentTurn: 0,
};

export default function App() {
  const [game, setGame] = useState(INITIAL_STATE);

  const bgMusic = useRef(null);

  function startMusic() {
    if (bgMusic.current) return;
    bgMusic.current = true;

    const ctx = new AudioContext();
    const gainNode = ctx.createGain();
    gainNode.gain.value = 0.15;
    gainNode.connect(ctx.destination);

    fetch("/sounds/suspense-bg.mp3")
      .then((res) => res.arrayBuffer())
      .then((buf) => ctx.decodeAudioData(buf))
      .then((audioBuffer) => {
        function playLoop() {
          const source = ctx.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(gainNode);
          source.start(0);
          source.onended = playLoop;
        }
        playLoop();
      });
  }

  function onGoToSetup() {
    startMusic();
    setGame((prev) => ({ ...prev, phase: "setup" }));
  }

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

  function onNewRound() {
    const category = pickRandomCategory(CATEGORIES);
    const { word, hint } = pickRandomWord(category);
    const impostorIndex = pickImpostorIndex(game.players.length);
    setGame((prev) => ({
      ...prev,
      phase: "reveal",
      category: category.name,
      word,
      hint,
      impostorIndex,
      currentTurn: 0,
    }));
  }

  function onRestart() {
    setGame(INITIAL_STATE);
  }

  const isHome = game.phase === "home";

  return (
    <div className="min-h-screen bg-moss flex flex-col items-center justify-center p-4 text-moss-light gap-6">
      <div className={`flex flex-col items-center text-center ${isHome ? "gap-4" : "gap-1"}`}>
        <div className={`opacity-40 tracking-widest ${isHome ? "text-4xl" : "text-2xl"}`}>🌲🏔️🌲</div>
        <div>
          <h1 className={`font-arcade text-canopy text-glow tracking-wider ${isHome ? "text-6xl" : "text-3xl"}`}>
            IMPOSTOR
          </h1>
          <p className={`font-arcade text-impostor text-glow-red ${isHome ? "text-3xl mt-2" : "text-lg"}`}>2</p>
        </div>
      </div>

      {isHome && <HomeScreen onStart={onGoToSetup} />}

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

      {game.phase === "game" && (
        <GameScreen
          players={game.players}
          impostorIndex={game.impostorIndex}
          onEnd={onEndGame}
        />
      )}

      {game.phase === "end" && (
        <EndScreen
          impostorName={game.players[game.impostorIndex]}
          word={game.word}
          category={game.category}
          onNewRound={onNewRound}
          onRestart={onRestart}
        />
      )}
    </div>
  );
}
