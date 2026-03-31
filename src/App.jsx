import { useState, useRef } from "react";
import { CATEGORIES } from "./data/words";
import { pickRandomCategory, pickRandomWord, pickImpostorIndices } from "./utils/game";
import HomeScreen from "./components/HomeScreen";
import SetupScreen from "./components/SetupScreen";
import RevealScreen from "./components/RevealScreen";
import GameScreen from "./components/GameScreen";
import EndScreen from "./components/EndScreen";
import SettingsScreen from "./components/SettingsScreen";

const INITIAL_STATE = {
  phase: "home",
  players: [],
  category: null,
  word: null,
  hint: null,
  impostorIndices: [],
  currentTurn: 0,
};

function loadSettings() {
  try {
    const saved = localStorage.getItem("impostor2-settings");
    if (saved) return JSON.parse(saved);
  } catch {}
  return { showHints: true, customWords: [] };
}

function saveSettings(settings) {
  localStorage.setItem("impostor2-settings", JSON.stringify(settings));
}

function buildCategories(customWords) {
  const all = [...CATEGORIES];
  const grouped = {};
  for (const w of customWords) {
    if (!grouped[w.category]) grouped[w.category] = [];
    grouped[w.category].push({ word: w.word, hint: w.hint });
  }
  for (const [name, words] of Object.entries(grouped)) {
    const existing = all.find((c) => c.name === name);
    if (existing) {
      existing.words = [...existing.words, ...words];
    } else {
      all.push({ name, words });
    }
  }
  return all;
}

export default function App() {
  const [game, setGame] = useState(INITIAL_STATE);
  const [settings, setSettings] = useState(loadSettings);

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

  function getCategories() {
    return buildCategories(settings.customWords);
  }

  function onGoToSetup() {
    startMusic();
    setGame((prev) => ({ ...prev, phase: "setup" }));
  }

  function onGoToSettings() {
    setGame((prev) => ({ ...prev, phase: "settings" }));
  }

  function onSaveSettings(newSettings) {
    setSettings(newSettings);
    saveSettings(newSettings);
    setGame((prev) => ({ ...prev, phase: "home" }));
  }

  function onBackFromSettings() {
    setGame((prev) => ({ ...prev, phase: "home" }));
  }

  function onStartGame(players) {
    const categories = getCategories();
    const category = pickRandomCategory(categories);
    const { word, hint } = pickRandomWord(category);
    const impostorIndices = pickImpostorIndices(players.length);
    setGame({
      phase: "reveal",
      players,
      category: category.name,
      word,
      hint,
      impostorIndices,
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

  function onEndGame(innocentsWin = true) {
    setGame((prev) => ({ ...prev, phase: "end", innocentsWin }));
  }

  function onNewRound() {
    const categories = getCategories();
    const category = pickRandomCategory(categories);
    const { word, hint } = pickRandomWord(category);
    const impostorIndices = pickImpostorIndices(game.players.length);
    setGame((prev) => ({
      ...prev,
      phase: "reveal",
      category: category.name,
      word,
      hint,
      impostorIndices,
      currentTurn: 0,
    }));
  }

  function onRestart() {
    setGame(INITIAL_STATE);
  }

  const isHome = game.phase === "home";
  const showBranding = game.phase !== "settings";
  const impostorNames = game.impostorIndices.map((i) => game.players[i]);

  return (
    <div className="min-h-screen bg-moss flex flex-col items-center justify-center p-4 text-moss-light gap-6">
      {showBranding && (
        <div className={`flex flex-col items-center text-center ${isHome ? "gap-4" : "gap-1"}`}>
          <div className={`opacity-40 tracking-widest ${isHome ? "text-4xl" : "text-2xl"}`}>🌲🏔️🌲</div>
          <div>
            <h1 className={`font-arcade text-canopy text-glow tracking-wider ${isHome ? "text-6xl" : "text-3xl"}`}>
              IMPOSTOR
            </h1>
            <p className={`font-arcade text-impostor text-glow-red ${isHome ? "text-3xl mt-2" : "text-lg"}`}>2</p>
          </div>
        </div>
      )}

      {isHome && <HomeScreen onStart={onGoToSetup} onSettings={onGoToSettings} />}

      {game.phase === "settings" && (
        <SettingsScreen
          settings={settings}
          onSave={onSaveSettings}
          onBack={onBackFromSettings}
        />
      )}

      {game.phase === "setup" && <SetupScreen onStartGame={onStartGame} />}

      {game.phase === "reveal" && (
        <RevealScreen
          players={game.players}
          currentTurn={game.currentTurn}
          impostorIndices={game.impostorIndices}
          word={game.word}
          hint={game.hint}
          category={game.category}
          showHints={settings.showHints}
          onNext={onNextTurn}
        />
      )}

      {game.phase === "game" && (
        <GameScreen
          players={game.players}
          impostorIndices={game.impostorIndices}
          onEnd={onEndGame}
        />
      )}

      {game.phase === "end" && (
        <EndScreen
          impostorNames={impostorNames}
          word={game.word}
          category={game.category}
          innocentsWin={game.innocentsWin}
          onNewRound={onNewRound}
          onRestart={onRestart}
        />
      )}
    </div>
  );
}
