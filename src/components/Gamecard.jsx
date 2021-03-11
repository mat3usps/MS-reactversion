function GameCard(game, image) {
  return (
    <div className="gamecard">
      <img src={image} alt={game} />
      <h3>{game}</h3>
    </div>
  );
}

export default GameCard;
