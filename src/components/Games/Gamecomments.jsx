import Gamecomment from "./Gamecomment";
import Gameform from "./Gameform";
import Instaimage from "./insta-placeholder.png";
import React, { useState, useEffect } from "react";
import firebase from "../firebaseConnection";

function Gamecomments({ selectedGame }) {
  const [commentStorage, setComments] = useState([
    {
      id: 1,
      name: "Mateus Pereira",
      profile: "mateusp.s",
      image: Instaimage,
      comment: "Joguei muito esse quando era mais novo.",
    },
  ]);

  useEffect(() => {
    refreshComments();
  }, [commentStorage]);

  async function handleComment(comment) {
    await firebase
      .firestore()
      .collection(`games/${selectedGame.href}/comments`)
      .add({
        id: commentStorage.length + 1,
        name: "Mateus Pereira",
        profile: "mateusp.s",
        image: Instaimage,
        comment: comment,
      })
      .then(() => {
        console.log("Comentário gravado.");
      })
      .catch((error) => {
        console.log("Algo deu errado", error);
      });
  }

  async function refreshComments() {
    await firebase
      .firestore()
      .collection(`games/${selectedGame.href}/comments`)
      .onSnapshot((snapshot) => {
        let comments = [];

        snapshot.forEach((comment) => {
          comments.push({
            id: comment.data().id,
            name: comment.data().name,
            profile: comment.data().profile,
            image: comment.data().image,
            comment: comment.data().comment,
          });
        });
        setComments(comments);
      });
  }

  function useLocalStorage(key, defaultValue) {
    const stored = localStorage.getItem(key);
    const initial = stored ? JSON.parse(stored) : defaultValue;
    const [value, setValue] = useState(initial);
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);
    return [value, setValue];
  }

  const addComment = (newComment) => {
    setComments((prevState) => {
      let comment = {
        image: "",
        name: "",
        profile: "",
        comment: newComment,
        id: prevState.length + 1,
      };
      return [...prevState, comment];
    });
  };

  return (
    <div>
      <div className="fixed-comments">
        {commentStorage.map(({ image, name, profile, comment, id }) => (
          <Gamecomment image={image} name={name} profile={profile} key={id}>
            {comment}
          </Gamecomment>
        ))}
      </div>
      <Gameform didSave={handleComment} />
    </div>
  );
}

export default Gamecomments;
