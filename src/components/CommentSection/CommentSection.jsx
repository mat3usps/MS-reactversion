import Commentview from "./CommentView";
import Commentform from "./CommentForm";
import React, { useState, useEffect, useContext } from "react";
import firebase from "../firebaseConnection";
import { UserContext } from "../../contexts/user";

function CommentSection({ selected, pathname }) {
  const [commentStorage, setComments] = useState([]);
  const { userLogged } = useContext(UserContext);

  useEffect(() => {
    refreshComments();
  });

  async function handleComment(comment) {
    await firebase
      .firestore()
      .collection(`comments/${pathname}/${selected.path}`)
      .add({
        name: userLogged.name,
        photo: userLogged.photo,
        comment: comment,
        user: userLogged.uid,
      })
      .then(() => {
        console.log("Comentário gravado.");
      })
      .catch((error) => {
        console.log("Comentário não foi postado", error);
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
            photo: item.data().photo,
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
