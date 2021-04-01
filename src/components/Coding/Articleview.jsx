import { Link } from "react-router-dom";
import Thumbsup from "../Thumbsup";
import Separator from "../../assets/Utility/bar.png";

function Article({ description, children, path }) {
  const storeLikes = (likes) => {};

  return (
    <div className="article">
      <Link
        to={`/coding/${path}`}
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <h3>{children}</h3>

        <p>{description}</p>
      </Link>
      <img className="separator" src={Separator} alt="Bar" />
      <Thumbsup />
    </div>
  );
}

export default Article;
