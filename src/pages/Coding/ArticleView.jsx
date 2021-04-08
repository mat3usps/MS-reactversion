import { Link } from "react-router-dom";
import Thumbsup from "../../components/ThumbsUp";
import Bar from "../../assets/Utility/bar.png";

function ArticleView({ description, children, path, userLogged }) {
  return (
    <div className="article">
      <Link
        to={`/coding/${path}`}
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <h3>{children}</h3>

        <p>{description}</p>
      </Link>
      <img className="separator" src={Bar} alt="Bar" />
      <Thumbsup userLogged={userLogged} page="coding" title={path} />
    </div>
  );
}

export default ArticleView;