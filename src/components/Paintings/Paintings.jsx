import Painting from "./Painting";
import P1 from "./P1.jpg";
import P1low from "./P1-low.jpg";
import P1photo from "./P1-photo.jpg";
import P2 from "./P2.jpg";
import P2low from "./P2-low.jpg";
import P2photo from "./P2-photo.jpg";
import { useState } from "react";

function Paintings() {
  const paintings = [
    {
      name: "Varanda",
      description:
        "The first ever frame painted by Mateus Pereira. The shapes and colors bring about the views from the author's porch. Such venture manifest in itself a range of technique experimentation brought out of pure curiosity.",
      price: "$ 800.00",
      image: P1low,
      largeImage: P1,
      photo: P1photo,
    },
    {
      name: "Pulo",
      description:
        "Based on the author's first jump. That's a frame to encapsulate the insanity hidden in the mind of a person who gazes down the enormous solid ground from over the clouds and throws oneself to the freeing fall.",
      price: "$ 650.00",
      image: P2low,
      largeImage: P2,
      photo: P2photo,
    },
  ];

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
    <div>
      <Painting
        superiorAction={superiorPainting}
        inferiorAction={inferiorPainting}
        description={currentPainting.description}
        price={currentPainting.price}
        image={currentPainting.image}
        titleEgg={currentPainting.photo}
        priceAction={""}
        largeImage={currentPainting.largeImage}
      >
        {currentPainting.name}
      </Painting>
    </div>
  );
}

export default Paintings;
