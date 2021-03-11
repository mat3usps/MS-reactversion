import { Children } from "react";

function Article(description) {
  return (
    <div className="article">
      <h3>{Children}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Article;
