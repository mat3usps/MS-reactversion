import React, { useEffect, useState } from "react";
import Arrow from "../../assets/Utility/arrow.svg";
import Zoomer from "../../components/Zoomer";
import BarButton from "../../components/BarButton";

function Painting({
  image,
  largeImage,
  children,
  description,
  price,
  superiorAction,
  inferiorAction,
  titleEgg,
  priceAction1,
  priceAction2,
  inCart,
}) {
  const [showingEgg, manipulateEgg] = useState(false);
  const [displayStoreOptions, setDisplayStoreOptions] = useState(false);

  const handleStoreOptions = () => {
    if (displayStoreOptions === false) {
      setDisplayStoreOptions(true);
    } else {
      setDisplayStoreOptions(false);
    }
  };

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
        <div>
          <button className="cart-button" onClick={handleStoreOptions}>
            {"$ " + price}
          </button>
          {displayStoreOptions && (
            <div className="painting-hidden-div">
              <BarButton onClick={priceAction1}>
                {inCart ? "Remove" : "Add to cart"}
              </BarButton>
              <BarButton onClick={priceAction2}>Buy now</BarButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Painting;
