function Article(description, children) {
  return (
    <div className="article">
      <h3>{children}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Article;
