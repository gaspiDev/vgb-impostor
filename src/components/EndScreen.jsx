import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import Card from "./Card";
import Button from "./Button";

export default function EndScreen({ impostorNames, word, category, innocentsWin, onNewRound, onRestart }) {
  useEffect(() => {
    if (innocentsWin) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#5AE07A", "#7EB8A8", "#FF6B4A", "#C4915F"],
      });
    }
  }, [innocentsWin]);

  return (
    <div className="flex flex-col gap-6 items-center w-full max-w-sm">
      <motion.div
        className="flex flex-col items-center gap-2"
        initial={{ y: -100, opacity: 0, rotate: innocentsWin ? 10 : -10 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 150, damping: 12 }}
      >
        <motion.img
          src={innocentsWin ? "/dog.png" : "/tiramisu.png"}
          alt={innocentsWin ? "Woof!" : "Tiramisu robado"}
          className="w-32 h-32 object-contain drop-shadow-lg"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
        <motion.p
          className={`font-bold text-lg text-center ${innocentsWin ? "text-canopy text-glow" : "text-impostor text-glow-red"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {innocentsWin ? "WOOF!" : "Se robaron el tiramisu!"}
        </motion.p>
      </motion.div>

      <Card>
        <div className="flex flex-col gap-6 items-center">
          <h2 className="text-2xl font-bold text-center">
            {innocentsWin ? (
              <span className="text-canopy text-glow">Ganan los inocentes!</span>
            ) : (
              <span className="text-impostor text-glow-red">
                {impostorNames.length > 1 ? "Ganan los impostores!" : "Gana el impostor!"}
              </span>
            )}
          </h2>

          <div className="w-full flex flex-col gap-3">
            <div className="bg-impostor/15 rounded-xl p-4">
              <p className="text-moss-light/60 text-sm">
                {impostorNames.length > 1 ? "Los Impostores eran" : "El Impostor era"}
              </p>
              <p className="text-xl font-bold text-impostor">{impostorNames.join(", ")}</p>
            </div>

            <div className="bg-woods rounded-xl p-4">
              <p className="text-moss-light/60 text-sm">{category}</p>
              <p className="text-xl font-bold text-moss-light">{word}</p>
            </div>
          </div>

          <div className="w-full flex flex-col gap-3">
            <Button onClick={onNewRound}>Jugar de Nuevo</Button>
            <Button onClick={onRestart} variant="secondary">Nueva Partida</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
