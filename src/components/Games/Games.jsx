import { useLocation, Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import Modal from "../Modal/Modal";
import { useState } from "react";
import Gamecomments from "./Gamecomments";
import Gamecard from "./Gamecard";
import GCicon from "../../assets/GamesImages/icon-gc.png";
import GCworld from "../../assets/GamesImages/world-gc.png";
import GCgameplay from "../../assets/GamesImages/GCbattle.gif";
import GCpve from "../../assets/GamesImages/gameplay-gc.jpg";
import GCpvp from "../../assets/GamesImages/GCpvp.jpg";
import TOAicon from "../../assets/GamesImages/icon-toa.png";
import TOAhistory from "../../assets/GamesImages/history-toa.png";
import TOAboss from "../../assets/GamesImages/boss-toa.jpg";
import TOAgameplay from "../../assets/GamesImages/TOAgameplay.gif";
import FFXIIicon from "../../assets/GamesImages/icon-ffxii.png";
import FFXIIboss from "../../assets/GamesImages/FFXIIboss.png";
import FFXIIbattle from "../../assets/GamesImages/FFXIIbattle.gif";
import FFXIIgameplay from "../../assets/GamesImages/gameplay-ffxii.jpg";
import FFXIIworld from "../../assets/GamesImages/world-ffxii.jpg";
import DDicon from "../../assets/GamesImages/icon-dd.png";
import DDbattle from "../../assets/GamesImages/DDbattle.png";
import DDboss from "../../assets/GamesImages/DDboss.png";
import DDhit from "../../assets/GamesImages/DDhit.png";
import DDgameplay from "../../assets/GamesImages/DDgameplay.gif";
import DDworld from "../../assets/GamesImages/DD-world.png";

function Games() {
  const games = [
    {
      name: "Grand Chase",
      icon: GCicon,
      href: "grand-chase",
      content:
        "GC as it would be called in my early teenage years, was the game to introduce me to the world of online gaming. At that time I didn't have ways to play at home so you would find me in the LAN houses around the neighborhood. To those who shared these experiences in crowded rooms and nights of non-stop playing, you'd probably remember me as that player who repaid the lack of reflexes with those so welcomed cash skills.",
      images: [GCgameplay, GCworld, GCpvp, GCpve],
    },
    {
      name: "Tactics Ogre: Knight of Lodis",
      icon: TOAicon,
      href: "tactics-ogre-kol",
      content:
        "Tactics is the one game that first served me as a motivation for learning English. The game history is beyond involving and since it allows us to be part of the game with the editable character, it was the perfect setting for having me, a tenish kid, translating most of it. I have to admit it wasn't always fun to play at times with a dictionary aside, but I was starting to taste the power of a second language and from there, it only grew.",
      images: [TOAgameplay, TOAhistory, TOAboss],
    },
    {
      name: "Final Fantasy XII",
      icon: FFXIIicon,
      href: "final-fantasy-xii",
      content:
        "Considered one of the greatest games of PS2 to me, FFXII is probably one of the games in which I spent the most time in life. Apart from the 100 hours normally taken to conclude the main history, the game has several extra bosses and missions to make you work hard until you complete all objectives. For the ones who played it, did you ever get all the summons? How does that feel? (I gotta say, I'll never know haha)",
      images: [FFXIIbattle, FFXIIgameplay, FFXIIworld, FFXIIboss],
    },
    {
      name: "Darkest Dungeon",
      icon: DDicon,
      href: "darkest-dungeon",
      content:
        "One of my most recent addictions, Darkest Dungeon is the perfect strategy game for whoever looks for a bit of terror. Its 2D graphics are very well elaborated and sets the scene for pretty jumpscare moments. The final blow that owned my heart is the dubbing. It has the most catching phrases that I have ever learned and can't help but repeat them together with the speaker every time it presents itself.",
      images: [DDgameplay, DDboss, DDhit, DDbattle, DDworld],
    },
  ];

  const location = useLocation();
  const history = useHistory();
  const [imageIndex, setImageIndex] = useState(0);

  const isContentShown = location.pathname !== "/games";
  const selectedGame = games.find(({ href }) =>
    location.pathname.includes(href)
  );

  const didCloseModal = () => {
    history.push("/games");
    setImageIndex(0);
  };

  const [expandedImage, setImageExtended] = useState(false);
  const openImage = () => {
    setImageExtended(true);
  };

  const closeImage = () => {
    setImageExtended(false);
  };

  if (isContentShown && !selectedGame) {
    return <Redirect to="/games"></Redirect>;
  }

  const nextImage = () => {
    if (selectedGame && imageIndex < selectedGame.images.length - 1) {
      setImageIndex(imageIndex + 1);
    } else {
      setImageIndex(0);
    }
  };

  const previousImage = () => {
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    } else {
      setImageIndex(selectedGame.images.length - 1);
    }
  };

  let previous = imageIndex - 1;
  if (selectedGame && imageIndex === 0) {
    previous = selectedGame.images.length - 1;
  }

  let next = imageIndex + 1;
  if (selectedGame && imageIndex === selectedGame.images.length - 1) {
    next = 0;
  }

  return (
    <div>
      <div className="allgames column">
        {games.map(({ name, icon, href }) => (
          <Gamecard icon={icon} href={href} key={name}>
            {name}
          </Gamecard>
        ))}
      </div>
      {selectedGame && (
        <Modal
          title={selectedGame.name}
          isOpen={isContentShown}
          didClose={didCloseModal}
          contentRelation="fit-content"
        >
          <div className="game-images-carrousel">
            <button className="games-modal-button" onClick={previousImage}>
              <img
                className="side-game-image previous-game-image"
                src={selectedGame.images[previous]}
                alt={selectedGame.images[previous]}
              />
            </button>
            <button className="central-games-modal-button" onClick={openImage}>
              <img
                className="central-game-image"
                src={selectedGame.images[imageIndex]}
                alt={selectedGame.images[imageIndex]}
              />
            </button>
            <button className="games-modal-button" onClick={nextImage}>
              <img
                className="side-game-image next-game-image"
                src={selectedGame.images[next]}
                alt={selectedGame.images[next]}
              />
            </button>
          </div>
          <p className="game-review">{selectedGame.content}</p>
          <Gamecomments selectedGame={selectedGame} />
        </Modal>
      )}
      {selectedGame && expandedImage ? (
        <button className="games-modal-button" onClick={closeImage}>
          <img
            className="game-expanded-image"
            src={selectedGame.images[imageIndex]}
            alt={selectedGame.images[imageIndex]}
          />
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default Games;
