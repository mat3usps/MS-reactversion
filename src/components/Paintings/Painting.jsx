import React, { useEffect, useState } from "react";
import Arrow from "./arrow.svg";
import Zoomer from "./Zoomer";

function Painting({
  image,
  largeImage,
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

  const [varZoomer, setZoomer] = useState(image);

  useEffect(() => {
    const intervalId = setInterval(function () {
      if (varZoomer !== image) setZoomer(image);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [varZoomer, image]);

  console.log(image);

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
        <div className="zoom-container">
          <Zoomer image={image} largeImage={largeImage}>
            {children}
          </Zoomer>
        </div>
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
