import Article from "./Article";

function Coding() {
  const articles = [
    {
      title: "A Brief Introduction on SVG in Web Development",
      description:
        "A quick explanation on SVG, the features that make its difference and some tips on SVG manipulation.",
    },
    {
      title: "The descovery of HTML",
      description:
        "Once one enter the field of technology, its almost mandatory to know a little of html structure.",
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
