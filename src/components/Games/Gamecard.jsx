import { Link } from "react-router-dom";

function GameCard({ children, icon, path }) {
  return (
    <Link
      to={`/games/${path}`}
      style={{ color: "inherit", textDecoration: "inherit" }}
    >
      <div className="gamecard">
        <img className="gameicon" src={icon} alt={children} />
        <h3>{children}</h3>
      </div>
    </Link>
  );
}

export default GameCard;
