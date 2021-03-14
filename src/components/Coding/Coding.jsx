import Article from "./Article";

function Coding() {
  const articles = [
    {
      title: "The Importance of SRP in React Components",
      description:
        "For the ones who are not aqcuainted to React's ins and outs, there must be a way and it surely starts with understanding SRP(the Single Responsability Principle).",
    },
    {
      title: "A Brief Introduction on SVG in Web Development",
      description:
        "A quick explanation on SVG, the features that make its difference and some tips on SVG manipulation.",
    },
    {
      title: "The Descovery of HTML",
      description:
        "Once one enter the field of technology, its almost mandatory to know a little of html structure. This quick one brings the basics of the language the builts the web.",
    },
  ];

  return (
    <div className="coding">
      {articles.map(({ title, description, href }) => (
        <Article description={description} href={href}>
          {title}
        </Article>
      ))}
    </div>
  );
}

export default Coding;
