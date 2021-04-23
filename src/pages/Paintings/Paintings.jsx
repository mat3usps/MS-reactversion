import Painting from "./Painting";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../components/Modal";
import PaintingStore from "./PaintingStore";
import { observer } from "mobx-react";
import { useUserStoreContext } from "../../contexts/userStoreContext";

const Paintings = observer(() => {
  const { addToCart } = useUserStoreContext();

  const [paintings, setPaintings] = useState([]);
  const [paintingStore, setPaintingStore] = useState(false);

  const buyNow = () => {
    setPaintingStore(true);
  };

  const didClosePaintingStore = () => {
    setPaintingStore(false);
  };

  useEffect(() => {
    axios
      .get("https://mp-reactversion-default-rtdb.firebaseio.com/painting.json")
      .then((response) => {
        const paintings = Object.values(response.data);
        setPaintings(paintings);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const [paintingIndex, changePainting] = useState(0);
  const superiorPainting = () => {
    if (paintingIndex === 0) {
      changePainting(paintings.length - 1);
    } else {
      changePainting(paintingIndex - 1);
    }
  };

  const inferiorPainting = () => {
    if (paintingIndex === paintings.length - 1) {
      changePainting(0);
    } else {
      changePainting(paintingIndex + 1);
    }
  };

  let currentPainting = paintings[paintingIndex];

  return (
    <div className="paintings">
      {paintings.length !== 0 && (
        <Painting
          superiorAction={superiorPainting}
          inferiorAction={inferiorPainting}
          description={currentPainting.description}
          price={currentPainting.price.toFixed(2)}
          image={currentPainting.image}
          titleEgg={currentPainting.photo}
          largeImage={currentPainting.largeImage}
          priceAction1={() => addToCart(currentPainting)}
          priceAction2={buyNow}
        >
          {currentPainting.name}
        </Painting>
      )}
      <Modal
        isOpen={paintingStore}
        didClose={didClosePaintingStore}
        contentRelation="fill-content"
      >
        <PaintingStore />
      </Modal>
    </div>
  );
});

export default Paintings;
