import Article from "./Article";

function Coding() {
  const articles = [
    {
      title: "A Brief Introduction on SVG in Web Development",
      description:
        "A quick explanation on SVG, the features that make its difference and some tips on SVG manipulation.",
    },
  ];

  return (
    <div className="coding">
      {articles.map(({ title, description }) => (
        <Article description={description}>{title}</Article>
      ))}
    </div>
  );
}

export default Coding;
