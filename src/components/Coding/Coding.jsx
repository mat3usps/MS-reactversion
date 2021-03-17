import { Document } from "react-pdf";
import { Redirect, useLocation } from "react-router";
import Article from "./Article";
import Out from "../out.svg";
import { Link } from "react-router-dom";

function Coding() {
  const articles = [
    {
      title: "The Importance of SRP in React Components",
      description:
        "For the ones who are not aqcuainted to React's ins and outs, there must be a way and it surely starts with understanding SRP(the Single Responsability Principle).",
      href: "srp-in-react",
      content: "",
    },
    {
      title: "A Brief Introduction on SVG in Web Development",
      description:
        "A quick explanation on SVG, the features that make its difference and some tips on SVG manipulation.",
      href: "./intro-on-svg",
      content: (
        <Document file="./A-Brief-Introduction-on-SVG-in-Web-Development.pdf"></Document>
      ),
    },
    {
      title: "The Descovery of HTML",
      description:
        "Once one enter the field of technology, its almost mandatory to know a little of html structure. This quick one brings the basics of the language the builts the web.",
      href: "descovery-html",
      content: "",
    },
  ];

  const location = useLocation();
  const isContentShown = location.pathname !== "/coding";
  const selectedArticle = articles.find(({ href }) =>
    location.pathname.includes(href)
  );

  if (isContentShown && !selectedArticle) {
    return <Redirect to="/coding"></Redirect>;
  }

  return (
    <div>
      <div className="coding">
        {articles.map(({ title, description, href }) => (
          <Article description={description} href={href} key={title}>
            {title}
          </Article>
        ))}
      </div>
      {isContentShown ? (
        <div className="modal-overlay">
          <div className="articlepresentation">
            <h2>{selectedArticle.title}</h2>
            <p className="content">{selectedArticle.content}</p>
            <button className="gamebutton">
              <Link to="/coding">
                <img src={Out} alt="Out" />
              </Link>
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Coding;
