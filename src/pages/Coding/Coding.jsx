import { Redirect, useLocation } from "react-router";
import ArticleView from "./ArticleView";
import Modal from "../../components/Modal";
import { useHistory } from "react-router-dom";
import Markdown from "../../components/Markdown";
import CommentSection from "../../components/CommentSection/CommentSection";
import ABISWD from "./ABriefIntroductiononSVGinWebDevelopment.md";
import TDHTML from "./TheDiscoverofHTML.md";
import TISRPRC from "./TheImportanceofSRPinReactComponents.md";

function Coding() {
  const articles = [
    {
      title: "The Importance of SRP in React Components",
      description:
        "For the ones who are not aqcuainted to React's ins and outs, there must be a way and it surely starts with understanding SRP(the Single Responsability Principle).",
      href: "srp-in-react",
      content: TISRPRC,
    },
    {
      title: "A Brief Introduction on SVG in Web Development",
      description:
        "A quick explanation on SVG, the features that make its difference and some tips on SVG manipulation.",
      href: "./intro-on-svg",
      content: ABISWD,
    },
    {
      title: "The Descovery of HTML",
      description:
        "Once one enter the field of technology, its almost mandatory to know a little of html structure. This quick one brings the basics of the language the builts the web.",
      href: "descovery-html",
      content: TDHTML,
    },
  ];

  /*const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("https://mp-reactversion-default-rtdb.firebaseio.com/coding.json")
      .then((response) => {
        const items = Object.values(response.data);
        setArticles(items);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [articles]);*/

  const location = useLocation();
  const history = useHistory();

  const isContentShown = location.pathname !== "/coding";
  const selectedArticle = articles.find(({ path }) =>
    location.pathname.includes(path)
  );

  if (isContentShown && !selectedArticle) {
    return <Redirect to="/coding"></Redirect>;
  }

  const didCloseModal = () => {
    history.push("/coding");
  };

  const didUpdateLikes = (currentLikes) => {};

  return (
    <div>
      <div className="coding">
        {articles.map(({ title, description, path }) => (
          <ArticleView
            didUpdateLikes={didUpdateLikes}
            description={description}
            path={path}
            key={title}
            likes={""}
          >
            {title}
          </ArticleView>
        ))}
      </div>
      {selectedArticle && (
        <Modal
          isOpen={isContentShown}
          contentRelation="scroll"
          didClose={didCloseModal}
        >
          <Markdown>{selectedArticle.content}</Markdown>
          <CommentSection selected={selectedArticle} pathname="coding" />
        </Modal>
      )}
    </div>
  );
}

export default Coding;
