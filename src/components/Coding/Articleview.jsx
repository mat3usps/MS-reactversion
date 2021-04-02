import { Link } from "react-router-dom";
import Thumbsup from "../Thumbsup/Thumbsup";
import Separator from "../../assets/Utility/bar.png";

function Article({ description, children, path, didUpdateLikes }) {
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
      <Thumbsup didUpdateLikes={didUpdateLikes} />
    </div>
  );
}

export default Article;
