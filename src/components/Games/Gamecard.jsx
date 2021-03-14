function GameCard({ name, image }) {
  return (
    <div className="gamecard">
      <img className="gameImage" src={image} alt={name} />
      <h3>{name}</h3>
    </div>
  );
}

export default GameCard;
