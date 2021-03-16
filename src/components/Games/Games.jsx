import { useLocation, Redirect } from "react-router";
import Gamecard from "./Gamecard";
import GCicon from "./icon-gc.png";
import TOAicon from "./icon-toa.png";
import FFXIIicon from "./icon-ffxii.png";

function Games() {
  const games = [
    {
      name: "GrandChase",
      icon: GCicon,
      href: "grandchase",
      content: "GC",
      images: [],
    },
    {
      name: "Tactis Ogre: Knight of Lodis",
      icon: TOAicon,
      href: "tactis-ogre-kol",
      content: "Tactis",
      images: [],
    },
    {
      name: "Final Fantasy XII",
      icon: FFXIIicon,
      href: "final-fantasy-xii",
      content: "Final",
      images: [],
    },
  ];

  const location = useLocation();
  const isContentShown = location.pathname !== "/games";
  const selectedGame = games.find(({ href }) =>
    location.pathname.includes(href)
  );

  console.log("isContentShown", isContentShown);
  console.log("selectedGame", selectedGame);

  if (isContentShown && !selectedGame) {
    return <Redirect to="/games"></Redirect>;
  }

  return (
    <div className="allgames column">
      {games.map(({ name, icon, href }) => (
        <Gamecard icon={icon} href={href} key={name}>
          {name}
        </Gamecard>
      ))}
    </div>
  );
}
export default Games;
