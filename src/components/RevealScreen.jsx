import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "./Card";
import Button from "./Button";

export default function RevealScreen({
  players,
  currentTurn,
  impostorIndices,
  word,
  hint,
  category,
  showHints,
  onNext,
}) {
  const [revealed, setRevealed] = useState(false);
  const isImpostor = impostorIndices.includes(currentTurn);
  const isLastPlayer = currentTurn === players.length - 1;
  const partner = isImpostor && impostorIndices.length > 1
    ? players[impostorIndices.find((i) => i !== currentTurn)]
    : null;

  function handleNext() {
    setRevealed(false);
    onNext();
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentTurn}
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -80, opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{ perspective: 1000, width: "100%", maxWidth: 384 }}
      >
        <motion.div
          animate={{ rotateY: revealed ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d", position: "relative", minHeight: 320 }}
        >
          {/* Back face — revealed content */}
          <div style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", position: "absolute", inset: 0 }}>
            <Card>
              <div className="flex flex-col gap-4 items-center justify-center h-full">
                {isImpostor ? (
                  <>
                    <h2 className="text-3xl font-bold text-impostor text-glow-red">
                      Impostor!
                    </h2>
                    <p className="text-moss-light/60 text-sm uppercase tracking-wide">
                      {category}
                    </p>
                    {showHints && (
                      <div className="bg-impostor/15 rounded-xl p-3 w-full">
                        <p className="text-moss-light/60 text-xs">Pista</p>
                        <p className="text-base font-medium text-moss-light">{hint}</p>
                      </div>
                    )}
                    {partner && (
                      <p className="text-sm text-moss-light/60">
                        Tu compañero: <span className="font-bold text-impostor">{partner}</span>
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-moss-light/60 text-sm uppercase tracking-wide">
                      {category}
                    </p>
                    <h2 className="text-3xl font-bold text-moss-light">{word}</h2>
                  </>
                )}

                <Button onClick={handleNext}>
                  {isLastPlayer ? "Comenzar Discusion" : "Siguiente Jugador"}
                </Button>
              </div>
            </Card>
          </div>

          {/* Front face — pass the phone */}
          <div style={{ backfaceVisibility: "hidden", position: "absolute", inset: 0 }}>
            <Card>
              <div className="flex flex-col gap-6 items-center justify-center h-full">
                <p className="text-moss-light/70 text-lg">
                  Pasa el telefono a
                </p>
                <h2 className="text-2xl font-bold text-moss-light">{players[currentTurn]}</h2>
                <Button onClick={() => setRevealed(true)}>Revelar</Button>
              </div>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
