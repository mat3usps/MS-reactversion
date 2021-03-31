import { Redirect, useLocation } from "react-router";
import { useState, useEffect } from "react";
import Article from "./Article";
import Modal from "../Modal";
import { useHistory } from "react-router-dom";
import Markdown from "./Markdown";
import Commentsection from "../Commentsection";
import axios from "axios";

function Coding() {
  const [articles, setArticles] = useState([]);

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
  }, [articles]);

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

  console.log(selectedArticle);

  return (
    <div>
      <div className="coding">
        {articles.map(({ title, description, path }) => (
          <Article description={description} path={path} key={title}>
            {title}
          </Article>
        ))}
      </div>
      {selectedArticle && (
        <Modal
          isOpen={isContentShown}
          contentRelation="scroll"
          didClose={didCloseModal}
        >
          <Markdown>{selectedArticle.content}</Markdown>
          <Commentsection selected={selectedArticle} pathname="coding" />
        </Modal>
      )}
    </div>
  );
}

export default Coding;
