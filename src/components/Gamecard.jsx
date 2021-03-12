function GameCard(children, image) {
  return (
    <div className="gamecard">
      <img src={image} alt={children} />
      <h3>{children}</h3>
    </div>
  );
}

export default GameCard;
