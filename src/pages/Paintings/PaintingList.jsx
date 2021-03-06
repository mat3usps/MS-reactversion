import Painting from "./Painting";
import { useState, useEffect } from "react";
import axios from "axios";
import { observer } from "mobx-react";
import { useMainStoreContext } from "../../contexts/mainStoreContext";

const PaintingList = observer(() => {
  const { cartStore } = useMainStoreContext();
  const { addToCart, setStore, removeFromCart, userCart } = cartStore;

  const [paintings, setPaintings] = useState([]);

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

  console.log("cart", userCart);

  const inCart = (item) => {
    if (userCart) {
      return userCart.find((object) => object.id === item.id) !== undefined;
    }
    return false;
  };

  const handleCart = (item) => {
    if (inCart(item)) {
      removeFromCart(item.name);
    } else {
      addToCart(item);
    }
  };

  const buyNow = (item) => {
    if (!inCart(item)) {
      addToCart(item);
    }
    setStore(true);
  };

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
          priceAction1={() => handleCart(currentPainting)}
          priceAction2={() => buyNow(currentPainting)}
          inCart={inCart(currentPainting)}
        >
          {currentPainting.name}
        </Painting>
      )}
    </div>
  );
});

export default PaintingList;
