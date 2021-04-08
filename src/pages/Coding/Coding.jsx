import { Redirect, useLocation } from "react-router";
import { useState, useEffect } from "react";
import ArticleView from "./ArticleView";
import Modal from "../../components/Modal";
import { useHistory } from "react-router-dom";
import Markdown from "../../components/Markdown";
import CommentSection from "../../components/CommentSection/CommentSection";
import axios from "axios";

function Coding({ userLogged }) {
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

  const didUpdateLikes = (currentLikes) => {};

  return (
    <div>
      <div className="coding">
        {articles.map(({ title, description, path }) => (
          <ArticleView
            userLogged={userLogged}
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
          <CommentSection
            selected={selectedArticle}
            userLogged={userLogged}
            pathname="coding"
          />
        </Modal>
      )}
    </div>
  );
}

export default Coding;
