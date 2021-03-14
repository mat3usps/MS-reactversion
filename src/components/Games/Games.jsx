import Gamecard from "./Gamecard";
import GCicon from "./icon-gc.png";

function Games() {
  const games = [{ name: "GrandChase", image: GCicon }];

  return (
    <div className="allgames column">
      {games.map(({ name, image }) => (
        <Gamecard image={image} name={name}></Gamecard>
      ))}
    </div>
  );
}
export default Games;
