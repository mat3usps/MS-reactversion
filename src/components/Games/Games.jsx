import { useLocation, Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import Modal from "../Modal";
import { useState, useEffect } from "react";
import Commentsection from "../Commentsection";
import Gamecard from "./Gamecard";
import axios from "axios";

function Games() {
  const [games, setGames] = useState([]);

  const location = useLocation();
  const history = useHistory();
  const [imageIndex, setImageIndex] = useState(0);

  const isContentShown = location.pathname !== "/games";

  useEffect(() => {
    axios
      .get("https://mp-reactversion-default-rtdb.firebaseio.com/games.json")
      .then((response) => {
        const articles = Object.values(response.data);
        setGames(articles);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [isContentShown]);

  const selectedGame = games.find(({ path }) =>
    location.pathname.includes(path)
  );

  console.log("location", location);

  console.log("selectedGame", selectedGame);

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

  if (selectedGame) {
    console.log("images", selectedGame.images);
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
