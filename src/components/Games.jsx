import Gamecard from "./Gamecard";
import GCicon from ".../public/assets/games/icon-gc.jpg";

function Games() {
  const games = [{ game: "GrandChase", image: GCicon }];

  return (
    <div className="allgames column">
      {games.map(({ game, image }) => (
        <Gamecard image={image} game={game}></Gamecard>
      ))}
    </div>
  );
}
export default Games;
