import { useEffect, useState } from "react";
import Like from "../assets/Utility/thumbsup.svg";
import firebase from "./firebaseConnection";
import { observer } from "mobx-react";
import { useMainStoreContext } from "../contexts/mainStoreContext";

const Thumbsup = observer(({ page, title }) => {
  const { userStore } = useMainStoreContext();
  const { loggedUser } = userStore;

  const [totalLikes, setTotalLikes] = useState([]);

  const liked = loggedUser
    ? totalLikes.find(({ user }) => loggedUser.uid === user)
    : null;

  useEffect(() => {
    refreshLikes();
  });

  const thumbsUpClass = liked
    ? "thumbs-up-button-activated"
    : "thumbs-up-button";

  async function handleLike() {
    const ref = firebase
      .firestore()
      .collection(`likes/${page}/${title}`)
      .doc(loggedUser.uid);

    if (!liked) {
      if (!loggedUser.isAnonymous) {
        await ref
          .set({
            name: loggedUser.name,
            photo: loggedUser.photo,
            user: loggedUser.uid,
          })
          .then(() => {
            console.log("Liked successfully.");
          })
          .catch((error) => {
            console.log("Couldn't handle like.", error.message);
          });
      } else {
        await ref
          .set({
            user: loggedUser.uid,
          })
          .then(() => {
            console.log("Liked successfully.");
          })
          .catch((error) => {
            console.log("Couldn't handle like.", error.message);
          });
      }
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

  const didLike = loggedUser
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
});

export default Thumbsup;
