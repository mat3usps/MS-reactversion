import { useEffect, useState } from "react";
import Like from "../assets/Utility/thumbsup.svg";
import firebase from "./firebaseConnection";

function Thumbsup({ userLogged, page, title }) {
  const [totalLikes, setTotalLikes] = useState([]);

  const liked = userLogged
    ? totalLikes.find(({ user }) => userLogged.uid === user)
    : null;

  useEffect(() => {
    refreshLikes();
  }, [totalLikes, liked]);

  const thumbsUpClass = liked
    ? "thumbs-up-button-activated"
    : "thumbs-up-button";

  async function handleLike() {
    const ref = firebase
      .firestore()
      .collection(`likes/${page}/${title}`)
      .doc(userLogged.uid);

    if (!liked) {
      await ref
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
      await ref
        .delete()
        .then(() => {
          console.log("Curtida excluida.");
        })
        .catch((error) => {
          console.log("error", error.message);
        });
    }
  }

  const didLike = userLogged
    ? (event) => {
        event.preventDefault();
        handleLike();
      }
    : null;

  async function refreshLikes() {
    await firebase
      .firestore()
      .collection(`likes/${page}/${title}`)
      .onSnapshot((doc) => {
        let likes = [];

        doc.forEach((item) => {
          likes.push({
            user: item.data().user,
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
