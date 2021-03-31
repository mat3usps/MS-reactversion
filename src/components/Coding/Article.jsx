import { Link } from "react-router-dom";
import Separator from "./bar.png";

function Article({ description, children, path }) {
  return (
    <Link
      to={`/coding/${path}`}
      style={{ color: "inherit", textDecoration: "inherit" }}
    >
      <div className="article">
        <h3>{children}</h3>
        <p>{description}</p>
        <img className="separator" src={Separator} alt="Bar" />
      </div>
    </Link>
  );
}

export default Article;
