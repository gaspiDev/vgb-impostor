import Button from "./Button";

export default function HomeScreen({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <p className="text-mist/70 text-lg max-w-xs">
        Encuentra al impostor de la casa <br></br>para que no se lleve el <b>tiramisu</b>.
      </p>

      <div className="w-full max-w-xs">
        <Button onClick={onStart}>Nueva Partida</Button>
      </div>
    </div>
  );
}
