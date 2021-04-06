import { useLocation, Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import Modal from "../Modal/Modal";
import { useState, useEffect } from "react";
import Commentsection from "../Commentsection/Commentsection";
import Gamecard from "./Gamecard";
import firebase from "../firebaseConnection";
import Thumbsup from "../Thumbsup/Thumbsup";
import Bar from "../../assets/Utility/bar.png";

function Games() {
  const [games, setGames] = useState([]);

  const location = useLocation();
  const history = useHistory();
  const [imageIndex, setImageIndex] = useState(1);

  const isContentShown = location.pathname !== "/games";

  async function refreshGames() {
    await firebase
      .firestore()
      .collection(`games`)
      .onSnapshot((doc) => {
        let games = [];

        doc.forEach((item) => {
          games.push({
            path: item.data().path,
            name: item.data().name,
            images: item.data().images,
            icon: item.data().icon,
            content: item.data().content,
          });
        });
        setGames(games);
      });
  }

  useEffect(() => {
    refreshGames();
  }, [isContentShown]);

  const selectedGame = games.find(({ path }) =>
    location.pathname.includes(path)
  );

  const didCloseModal = () => {
    history.push("/games");
    setImageIndex(1);
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
      setImageIndex(1);
    }
  };

  const previousImage = () => {
    if (imageIndex > 1) {
      setImageIndex(imageIndex - 1);
    } else {
      setImageIndex(selectedGame.images.length - 1);
    }
  };

  let previous = imageIndex - 1;
  if (selectedGame && imageIndex === 1) {
    previous = selectedGame.images.length - 1;
  }

  let next = imageIndex + 1;
  if (selectedGame && imageIndex === selectedGame.images.length - 1) {
    next = 1;
  }

  return (
    <div>
      <div className="allgames column">
        {games.map(({ name, icon, path }) => (
          <Gamecard icon={icon} path={path} key={name}>
            {name}
          </Gamecard>
        ))}
      </div>
      {selectedGame && (
        <Modal
          title={selectedGame.name}
          isOpen={isContentShown}
          didClose={didCloseModal}
          contentRelation="scroll"
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
          <img className="separator" src={Bar} alt="Bar" />
          <Thumbsup />
          <Commentsection selected={selectedGame} pathname="games" />
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
