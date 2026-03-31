import { useState } from "react";
import Card from "./Card";
import Button from "./Button";

export default function SettingsScreen({ settings, onSave, onBack }) {
  const [showHints, setShowHints] = useState(settings.showHints);
  const [customWords, setCustomWords] = useState(settings.customWords);
  const [categoryName, setCategoryName] = useState("");
  const [wordText, setWordText] = useState("");
  const [hintText, setHintText] = useState("");

  function addWord() {
    if (!categoryName.trim() || !wordText.trim()) return;
    setCustomWords((prev) => [
      ...prev,
      { category: categoryName.trim(), word: wordText.trim(), hint: hintText.trim() },
    ]);
    setWordText("");
    setHintText("");
  }

  function removeWord(index) {
    setCustomWords((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSave() {
    onSave({ showHints, customWords });
  }

  const grouped = customWords.reduce((acc, w) => {
    if (!acc[w.category]) acc[w.category] = [];
    acc[w.category].push(w);
    return acc;
  }, {});

  const inputClass = "w-full border border-moss-light/20 bg-woods rounded-xl px-3 py-2 text-base text-moss-light placeholder-moss-light/40 focus:outline-none focus:border-canopy";

  return (
    <Card>
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-bold text-moss-light">Configuracion</h2>

        {/* Hints toggle */}
        <div className="flex items-center justify-between">
          <span className="text-moss-light/80">Mostrar pistas</span>
          <button
            onClick={() => setShowHints((v) => !v)}
            className={`w-14 h-8 rounded-full transition-colors cursor-pointer flex items-center px-1 ${showHints ? "bg-canopy" : "bg-woods"}`}
          >
            <div className={`w-6 h-6 rounded-full bg-moss-light transition-transform ${showHints ? "translate-x-6" : "translate-x-0"}`} />
          </button>
        </div>

        {/* Custom words */}
        <div className="flex flex-col gap-3">
          <p className="text-moss-light/80 font-semibold">Palabras personalizadas</p>

          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Categoria"
            className={inputClass}
          />
          <div className="flex gap-2">
            <input
              type="text"
              value={wordText}
              onChange={(e) => setWordText(e.target.value)}
              placeholder="Palabra"
              className={inputClass}
            />
            <input
              type="text"
              value={hintText}
              onChange={(e) => setHintText(e.target.value)}
              placeholder="Pista"
              className={inputClass}
            />
          </div>
          <button
            onClick={addWord}
            disabled={!categoryName.trim() || !wordText.trim()}
            className="w-full py-2 rounded-xl bg-canopy/20 text-canopy font-semibold text-sm cursor-pointer hover:bg-canopy/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            + Agregar palabra
          </button>

          {/* List grouped by category */}
          {Object.entries(grouped).map(([cat, words]) => (
            <div key={cat} className="flex flex-col gap-1">
              <p className="text-moss-light/50 text-xs uppercase tracking-wide">{cat}</p>
              {words.map((w) => {
                const idx = customWords.indexOf(w);
                return (
                  <div key={idx} className="flex items-center justify-between bg-woods rounded-lg px-3 py-2">
                    <span className="text-moss-light text-sm">
                      {w.word} {w.hint && <span className="text-moss-light/40">— {w.hint}</span>}
                    </span>
                    <button
                      onClick={() => removeWord(idx)}
                      className="text-impostor text-sm font-bold cursor-pointer ml-2"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={handleSave}>Guardar</Button>
          <Button onClick={onBack} variant="secondary">Volver</Button>
        </div>
      </div>
    </Card>
  );
}
