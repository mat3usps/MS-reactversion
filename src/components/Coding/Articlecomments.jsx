import Articlecomment from "./Articlecomment";
import Articleform from "./Articleform";
import Instaimage from "./insta-placeholder.png";
import React, { useState, useEffect } from "react";
import firebase from "../firebaseConnection";

function Articlecomments({ selectedArticle }) {
  const [commentStorage, setComments] = useState([
    {
      id: 1,
      name: "Mateus Pereira",
      profile: "mateusp.s",
      image: "",
      comment: "Joguei muito esse quando era mais novo.",
    },
  ]);

  useEffect(() => {
    refreshComments();
  }, [commentStorage]);

  async function handleComment(comment) {
    await firebase
      .firestore()
      .collection(`article/${selectedArticle.href}/comments`)
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
      .collection(`article/${selectedArticle.href}/comments`)
      .get()
      .then((snapshot) => {
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
      })
      .catch((error) => {
        console.log("Algo deu errado", error);
      });
  }

  return (
    <div>
      <div className="fixed-comments">
        {commentStorage.map(({ image, name, profile, comment, id }) => (
          <Articlecomment image={image} name={name} profile={profile} key={id}>
            {comment}
          </Articlecomment>
        ))}
      </div>
      <Articleform didSave={handleComment} />
    </div>
  );
}

export default Articlecomments;
