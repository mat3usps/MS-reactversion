import Gamecard from "./Gamecard";

function Games() {
  const games = [{ name: "GrandChase", image: "GCicon" }];

  return (
    <div className="allgames column">
      {games.map(({ name, image }) => (
        <Gamecard image={image}>{name}</Gamecard>
      ))}
    </div>
  );
}
export default Games;
