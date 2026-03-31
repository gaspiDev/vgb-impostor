import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "./Card";
import Button from "./Button";

const TURN_SECONDS = 60;

function rotateFrom(arr, startIndex) {
  return [...arr.slice(startIndex), ...arr.slice(0, startIndex)];
}

function randomStartOrder(playerList) {
  const start = Math.floor(Math.random() * playerList.length);
  return rotateFrom(playerList, start);
}

function vibrate(pattern) {
  if (navigator.vibrate) navigator.vibrate(pattern);
}

export default function GameScreen({ players, impostorIndices, onEnd }) {
  const [activePlayers, setActivePlayers] = useState(() => {
    const list = players.map((name, i) => ({ name, originalIndex: i }));
    return randomStartOrder(list);
  });
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(TURN_SECONDS);
  const [phase, setPhase] = useState("turns");
  const [round, setRound] = useState(1);
  const [kickedPlayer, setKickedPlayer] = useState(null);
  const tickingRef = useRef(null);

  const finishTurns = useCallback(() => {
    setPhase("vote");
  }, []);

  const advancePlayer = useCallback(() => {
    if (currentPlayer >= activePlayers.length - 1) {
      finishTurns();
    } else {
      setCurrentPlayer((p) => p + 1);
      setSecondsLeft(TURN_SECONDS);
    }
  }, [currentPlayer, activePlayers.length, finishTurns]);

  // Countdown timer
  useEffect(() => {
    if (phase !== "turns" || secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [secondsLeft, phase]);

  // Auto-advance on time out
  useEffect(() => {
    if (phase === "turns" && secondsLeft <= 0) {
      vibrate(300);
      advancePlayer();
    }
  }, [secondsLeft, phase, advancePlayer]);

  // Ticking sound + vibration for last 10 seconds
  useEffect(() => {
    if (phase === "turns" && secondsLeft <= 10 && secondsLeft > 0) {
      if (!tickingRef.current) {
        const audio = new Audio("/sounds/minecraft-click.mp3");
        audio.volume = 0.4;
        tickingRef.current = setInterval(() => {
          audio.currentTime = 0;
          audio.play();
          vibrate(50);
        }, 1000);
      }
    } else {
      if (tickingRef.current) {
        clearInterval(tickingRef.current);
        tickingRef.current = null;
      }
    }
    return () => {
      if (tickingRef.current) {
        clearInterval(tickingRef.current);
        tickingRef.current = null;
      }
    };
  }, [secondsLeft, phase]);

  function handleVote(playerIndex) {
    const voted = activePlayers[playerIndex];
    const wasImpostor = impostorIndices.includes(voted.originalIndex);
    new Audio(wasImpostor ? "/sounds/yay.mp3" : "/sounds/oof.mp3").play();
    vibrate(wasImpostor ? [100, 50, 100, 50, 200] : [500]);
    setKickedPlayer(voted);
    setPhase("result");
  }

  function handleAfterKick(innocentsWin) {
    const remaining = activePlayers.filter((p) => p !== kickedPlayer);
    const remainingImpostors = remaining.filter((p) => impostorIndices.includes(p.originalIndex));

    if (remainingImpostors.length === 0) {
      onEnd(true);
      return;
    }

    const remainingInnocents = remaining.length - remainingImpostors.length;
    if (remainingInnocents <= remainingImpostors.length) {
      onEnd(false);
      return;
    }

    setActivePlayers(randomStartOrder(remaining));
    setCurrentPlayer(0);
    setSecondsLeft(TURN_SECONDS);
    setRound((r) => r + 1);
    setKickedPlayer(null);
    setPhase("turns");
  }

  const minutes = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const time = `${minutes}:${secs.toString().padStart(2, "0")}`;
  const isLow = secondsLeft <= 10;

  if (phase === "result") {
    const wasImpostor = impostorIndices.includes(kickedPlayer.originalIndex);
    const remaining = activePlayers.filter((p) => p !== kickedPlayer);
    const remainingImpostors = remaining.filter((p) => impostorIndices.includes(p.originalIndex));
    const remainingInnocents = remaining.length - remainingImpostors.length;
    const impostorWins = !wasImpostor && remainingInnocents <= remainingImpostors.length;
    const allImpostorsOut = wasImpostor && remainingImpostors.length === 0;

    return (
      <Card>
        <div className="flex flex-col gap-6 items-center text-center">
          <h2 className="text-2xl font-bold text-moss-light">{kickedPlayer.name}</h2>
          {allImpostorsOut ? (
            <>
              <div className="bg-canopy/20 rounded-xl p-4 w-full">
                <p className="text-canopy text-lg font-bold text-glow">Era el Impostor!</p>
              </div>
              <p className="text-moss-light/70">Los inocentes ganan!</p>
              <Button onClick={() => handleAfterKick(true)}>Ver Resultado</Button>
            </>
          ) : wasImpostor ? (
            <>
              <div className="bg-canopy/20 rounded-xl p-4 w-full">
                <p className="text-canopy text-lg font-bold text-glow">Era un Impostor!</p>
              </div>
              <p className="text-moss-light/70">Pero queda otro impostor...</p>
              <Button onClick={handleAfterKick}>Continuar</Button>
            </>
          ) : impostorWins ? (
            <>
              <div className="bg-impostor/15 rounded-xl p-4 w-full">
                <p className="text-impostor text-lg font-bold text-glow-red">Era inocente...</p>
              </div>
              <p className="text-moss-light/70">No quedan suficientes jugadores.</p>
              <p className="text-impostor font-bold text-lg">El impostor gana!</p>
              <Button onClick={() => onEnd(false)} variant="danger">Ver Resultado</Button>
            </>
          ) : (
            <>
              <div className="bg-impostor/15 rounded-xl p-4 w-full">
                <p className="text-impostor text-lg font-bold">Era inocente...</p>
              </div>
              <p className="text-moss-light/70">El impostor sigue libre. Otra ronda!</p>
              <Button onClick={handleAfterKick}>Continuar</Button>
            </>
          )}
        </div>
      </Card>
    );
  }

  if (phase === "vote") {
    return (
      <Card>
        <div className="flex flex-col gap-5 items-center">
          <h2 className="text-2xl font-bold text-moss-light">A quien expulsan?</h2>
          <p className="text-moss-light/50 text-sm">Ronda {round}</p>
          <div className="w-full flex flex-col gap-2">
            {activePlayers.map((player, i) => (
              <button
                key={player.originalIndex}
                onClick={() => handleVote(i)}
                className="w-full py-3 px-4 rounded-xl bg-woods text-moss-light text-lg font-semibold text-center hover:bg-woods/70 transition-colors cursor-pointer"
              >
                {player.name}
              </button>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex flex-col gap-6 items-center">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-moss-light">Hora de hablar</h2>
          {round > 1 && <span className="text-moss-light/40 text-sm">Ronda {round}</span>}
        </div>
        <p className="text-moss-light/70 text-lg text-center">
          Cada uno dice una palabra y al finalizar se vota para expulsar al impostor <br /><b>o no...!</b>
        </p>

        <div className="w-full flex flex-col gap-2 items-center">
          <p className="text-moss-light/50 text-sm uppercase tracking-wide">Turno de</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={`${round}-${currentPlayer}`}
              className="text-xl font-bold text-moss-light"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {activePlayers[currentPlayer].name}
            </motion.p>
          </AnimatePresence>
          <p className="text-moss-light/40 text-xs">
            {currentPlayer + 1} / {activePlayers.length}
          </p>
        </div>

        <div className={`text-5xl font-arcade tabular-nums ${isLow ? "text-impostor text-glow-red" : "text-canopy text-glow"}`}>
          {time}
        </div>

        <Button onClick={advancePlayer}>
          {currentPlayer < activePlayers.length - 1 ? "Siguiente" : "Votar"}
        </Button>
      </div>
    </Card>
  );
}
