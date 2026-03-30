import Card from "./Card";
import Button from "./Button";

export default function EndScreen({ impostorName, word, category, onNewRound, onRestart }) {
  return (
    <Card>
      <div className="flex flex-col gap-6 items-center">
        <h2 className="text-2xl font-bold text-mist">Fin de la Partida</h2>

        <div className="w-full flex flex-col gap-3">
          <div className="bg-impostor/15 rounded-xl p-4">
            <p className="text-moss-light/60 text-sm">El Impostor era</p>
            <p className="text-xl font-bold text-impostor">{impostorName}</p>
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
  );
}
