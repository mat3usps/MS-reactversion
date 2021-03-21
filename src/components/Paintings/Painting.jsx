import { useState } from "react";
import Arrow from "./arrow.svg";

function Painting({
  image,
  children,
  description,
  price,
  superiorAction,
  inferiorAction,
  titleEgg,
  priceAction,
}) {
  const [showingEgg, manipulateEgg] = useState(false);
  const displayTitleEgg = () => {
    if (showingEgg === false) {
      manipulateEgg(true);
    } else {
      manipulateEgg(false);
    }
  };

  return (
    <div className="painting">
      <div className="frame">
        <button
          className="superior-arrow-button arrow-button"
          onClick={superiorAction}
        >
          <img src={Arrow} alt="superior" />
        </button>
        <br />
        <img className="paintingImage" src={image} alt={children} />
        <br />
        <button
          className="inferior-arrow-button arrow-button"
          onClick={inferiorAction}
        >
          <img src={Arrow} alt="inferior" />
        </button>
      </div>
      <div className="frameInfo">
        <button className="painting-title-egg-button" onClick={displayTitleEgg}>
          <h2>{children}</h2>
        </button>
        {showingEgg && (
          <img className="painting-egg" src={titleEgg} alt={titleEgg} />
        )}
        <p>{description}</p>
        <button className="cart-button" type="text" onClick={priceAction}>
          {price}
        </button>
      </div>
    </div>
  );
}

export default Painting;
