import Commentview from "./CommentView";
import Commentform from "./CommentForm";
import Instaimage from "./insta-placeholder.png";
import React, { useState, useEffect } from "react";
import firebase from "../firebaseConnection";

function CommentSection({ selected, pathname }) {
  const [commentStorage, setComments] = useState([]);

  useEffect(() => {
    refreshComments();
  }, [commentStorage]);

  async function handleComment(comment) {
    await firebase
      .firestore()
      .collection(`comments/${pathname}/${selected.path}`)
      .add({
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
      .collection(`comments/${pathname}/${selected.path}`)
      .onSnapshot((doc) => {
        let comments = [];

        doc.forEach((item) => {
          comments.push({
            id: item.id,
            name: item.data().name,
            profile: item.data().profile,
            image: item.data().image,
            comment: item.data().comment,
            pathname: pathname,
            selected: selected,
          });
        });
        setComments(comments);
      });
  }

  return (
    <div>
      <div className="fixed-comments">
        {commentStorage.map(
          ({ image, name, profile, comment, id, pathname, selected }) => (
            <Commentview
              image={image}
              name={name}
              profile={profile}
              key={id}
              pathname={pathname}
              selected={selected}
              id={id}
            >
              {comment}
            </Commentview>
          )
        )}
      </div>
      <Commentform didSave={handleComment} />
    </div>
  );
}

export default CommentSection;
