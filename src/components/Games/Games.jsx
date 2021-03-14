import Gamecard from "./Gamecard";
import GCicon from "./icon-gc.png";
import TOAicon from "./icon-toa.png";
import FFXIIicon from "./icon-ffxii.png";

function Games() {
  const games = [
    { name: "GrandChase", icon: GCicon },
    { name: "Tactis Ogre: Knight of Lodis", icon: TOAicon },
    { name: "Final Fantasy XII", icon: FFXIIicon },
  ];

  return (
    <div className="allgames column">
      {games.map(({ name, icon, href }) => (
        <Gamecard icon={icon} href={href}>
          {name}
        </Gamecard>
      ))}
    </div>
  );
}
export default Games;
