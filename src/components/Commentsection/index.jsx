import Commentview from "./Commentview";
import Commentform from "./Commentform";
import Instaimage from "./insta-placeholder.png";
import React, { useState, useEffect } from "react";
import firebase from "../firebaseConnection";

function Commentsection({ selected, pathname }) {
  const [commentStorage, setComments] = useState([]);

  useEffect(() => {
    refreshComments();
  }, [commentStorage]);

  async function handleComment(comment) {
    await firebase
      .firestore()
      .collection(`comments/${pathname}/${selected.href}`)
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
        console.log("Comentário deu errado", error);
      });
  }

  async function refreshComments() {
    await firebase
      .firestore()
      .collection(`${pathname}/${selected.href}/comments`)
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

  return (
    <div>
      <div className="fixed-comments">
        {commentStorage.map(({ image, name, profile, comment, id }) => (
          <Commentview image={image} name={name} profile={profile} key={id}>
            {comment}
          </Commentview>
        ))}
      </div>
      <Commentform didSave={handleComment} />
    </div>
  );
}

export default Commentsection;
