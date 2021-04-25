import Painting from "./Painting";
import { useState, useEffect } from "react";
import axios from "axios";
import { observer } from "mobx-react";
import { useMainStoreContext } from "../../contexts/mainStoreContext";

const Paintings = observer(() => {
  const { cartStore } = useMainStoreContext();
  const { addToCart, setStore, removeFromCart, userCart } = cartStore;

  const [paintings, setPaintings] = useState([]);

  const buyNow = () => {
    setStore(true);
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

  const handleCart = (item) => {
    const inCart =
      userCart.length > 0
        ? userCart.filter((object) => {
            return object.name === item.name;
          }).length > 0
        : null;
    if (inCart) {
      removeFromCart(currentPainting);
    } else {
      addToCart(currentPainting);
    }
  };

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
          priceAction1={handleCart(currentPainting)}
          priceAction2={buyNow}
        >
          {currentPainting.name}
        </Painting>
      )}
    </div>
  );
});

export default Paintings;
