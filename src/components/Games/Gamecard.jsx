import { Link } from "react-router-dom";

function GameCard({ children, icon, href }) {
  return (
    <Link
      to={`/games/${href}`}
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
