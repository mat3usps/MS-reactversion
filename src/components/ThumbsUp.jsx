import { useEffect, useState } from "react";
import Like from "../assets/Utility/thumbsup.svg";
import firebase from "./firebaseConnection";

function Thumbsup({ userLogged, page, title }) {
  const [totalLikes, setTotalLikes] = useState([]);

  useEffect(() => {
    refreshLikes();
  }, [totalLikes]);

  const liked = totalLikes.find(({ user }) => userLogged.uid.includes(user));

  console.log("total", totalLikes);
  console.log("liked", liked);

  const thumbsUpClass = liked
    ? "thumbs-up-button-activated"
    : "thumbs-up-button";

  async function handleLike() {
    if (!liked) {
      await firebase
        .firestore()
        .collection(`likes/${page}/${title}`)
        .doc(`${userLogged.uid}`)
        .set({
          name: userLogged.name,
          photo: userLogged.photo,
          user: userLogged.uid,
        })
        .then(() => {
          console.log("Curtida gravada.");
        })
        .catch((error) => {
          console.log("Algo deu errado", error.message);
        });
    } else {
      await firebase.firestore
        .collection(`likes/${page}/${title}`)
        .doc(`${userLogged.uid}`)
        .delete()
        .then(() => {
          console.log("Curtida excluida.");
        })
        .catch((error) => {
          console.log("error", error.message);
        });
    }
  }

  const didLike = (event) => {
    event.preventDefault();
    handleLike();
  };

  async function refreshLikes() {
    await firebase
      .firestore()
      .collection(`likes/${page}/${title}`)
      .onSnapshot((doc) => {
        let likes = [];

        doc.forEach((item) => {
          likes.push({
            uid: item.data().uid,
            name: item.data().name,
            photo: item.data().photo,
          });
        });
        setTotalLikes(likes);
      });
  }

  return (
    <div className="thumbs-up-div">
      <img src={Like} className={thumbsUpClass} alt="Liked" onClick={didLike} />
    </div>
  );
}

export default Thumbsup;