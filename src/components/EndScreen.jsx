import Card from "./Card";
import Button from "./Button";

export default function EndScreen({ impostorName, word, category, onRestart }) {
  return (
    <Card>
      <div className="flex flex-col gap-6 items-center">
        <h2 className="text-2xl font-bold text-mist">Fin de la Partida</h2>

        <div className="w-full flex flex-col gap-3">
          <div className="bg-impostor/15 rounded-xl p-4">
            <p className="text-woods/60 text-sm">El Impostor era</p>
            <p className="text-xl font-bold text-impostor">{impostorName}</p>
          </div>

          <div className="bg-moss rounded-xl p-4">
            <p className="text-woods/60 text-sm">{category}</p>
            <p className="text-xl font-bold text-woods">{word}</p>
          </div>
        </div>

        <Button onClick={onRestart}>Jugar de Nuevo</Button>
      </div>
    </Card>
  );
}
