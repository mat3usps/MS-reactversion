import { useLocation, Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import Modal from "../../components/Modal";
import { useState, useEffect } from "react";
import CommentSection from "../../components/CommentSection/CommentSection";
import GameCard from "./GameCard";
import firebase from "../../components/firebaseConnection";
import Thumbsup from "../../components/ThumbsUp";
import Bar from "../../assets/Utility/bar.png";

function Games() {
  const [games, setGames] = useState([]);

  const location = useLocation();
  const history = useHistory();
  const [imageIndex, setImageIndex] = useState(0);

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
      <div className="games column">
        {games.map(({ name, icon, path }) => (
          <GameCard icon={icon} path={path} key={name}>
            {name}
          </GameCard>
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
          <Thumbsup page="games" title={selectedGame.path} />
          <CommentSection selected={selectedGame} pathname="games" />
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
