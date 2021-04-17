import { useState } from "react";
import avatar from "../../assets/Utility/avatar.png";
import firebase from "../../components/firebaseConnection";
import LoadingSVG from "../../components/LoadingSVG";
import { observer } from "mobx-react";
import { useUserStoreContext } from "../../contexts/userStoreContext";

const ProfileManager = observer(() => {
  const { loggedUser } = useUserStoreContext();

  const [isLoading, setIsLoading] = useState(false);

  const [nameToUpdate, setNameToUpdate] = useState(
    loggedUser && loggedUser.name
  );
  const [photoToUpdate, setPhotoToUpdate] = useState(
    loggedUser && loggedUser.photo
  );
  const [currentPhoto, setCurrentPhoto] = useState(
    loggedUser && loggedUser.photo
  );

  const [successMessage, setSuccessMessage] = useState("");
  const [passwordUpdate, setPasswordUpdate] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  function updateConfirmation(message) {
    setSuccessMessage(message);
    setInterval(() => {
      setSuccessMessage("");
    }, 5000);
  }

  const updatingPassword = (event) => setPasswordUpdate(event.target.value);
  const confirmingPassword = (event) =>
    setPasswordConfirmation(event.target.value);

  function handleFile(e) {
    e.preventDefault();
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        setPhotoToUpdate(image);
        setCurrentPhoto(URL.createObjectURL(e.target.files[0]));
      } else {
        alert("Envie uma imagem do tipo PNG ou JPEG");
        setPhotoToUpdate(null);
        return null;
      }
    }
  }

  async function handleUpload() {
    setIsLoading(true);
    const currentUid = loggedUser.uid;
    await firebase
      .storage()
      .ref(`userPhotos/${currentUid}/${photoToUpdate.name}`)
      .put(photoToUpdate)
      .then(async () => {
        await firebase
          .storage()
          .ref(`userPhotos/${currentUid}`)
          .child(photoToUpdate.name)
          .getDownloadURL()
          .then(async (url) => {
            let urlPhoto = url;

            await firebase
              .firestore()
              .collection("users")
              .doc(loggedUser.uid)
              .update({
                photo: urlPhoto,
                name: nameToUpdate,
              })
              .then(() => {
                setIsLoading(false);
                updateConfirmation("User successfully updated");
              })
              .catch((error) => {
                setIsLoading(false);
                updateConfirmation("Error, user wasn't updated");
                console.log("error", error);
              });
          })
          .catch((error) => {
            setIsLoading(false);
            updateConfirmation("Error, couldn't get URL");
            console.log("error", error);
          });
      })
      .catch((error) => {
        setIsLoading(false);
        updateConfirmation("Error, couldn't upload file");
        console.log("error", error);
      });
  }

  async function handleSave(e) {
    e.preventDefault();
    setIsLoading(true);

    if (photoToUpdate === null && nameToUpdate !== "") {
      await firebase
        .firestore()
        .collection("users")
        .doc(loggedUser.uid)
        .update({
          name: nameToUpdate,
        })
        .then(() => {
          setIsLoading(false);
          updateConfirmation("Name was successfully updated");
        })
        .catch((error) => {
          setIsLoading(false);
          updateConfirmation("Name wasn't updated");
          console.log(error);
        });
    } else if (nameToUpdate !== "" && photoToUpdate !== null) {
      handleUpload();
    }
  }

  return (
    <div className="profile-manager">
      {!isLoading ? (
        <div>
          <form className="form-profile" onSubmit={handleSave}>
            <label className="label-avatar">
              <input type="file" accept="image/*" onChange={handleFile} />
              <br />
              {loggedUser.photo === null ? (
                <img src={avatar} width="300" height="300" alt="User's" />
              ) : (
                <img src={currentPhoto} width="300" height="300" alt="User's" />
              )}
            </label>

            <label>Name</label>
            <input
              type="text"
              value={nameToUpdate}
              onChange={(e) => {
                setNameToUpdate(e.target.value);
              }}
            />

            <button type="submit">Salvar</button>
          </form>
          <div className="profile-password-field">
            <input
              disabled={true}
              id="password"
              className="modal-input"
              type="password"
              placeholder="Password"
              value={passwordUpdate}
              onChange={updatingPassword}
            ></input>
            <br />
            <input
              disabled={true}
              type="password"
              className="modal-input"
              placeholder="Confirm password"
              value={passwordConfirmation}
              onChange={confirmingPassword}
            ></input>
            <hr />
            <p>{successMessage}</p>
          </div>
        </div>
      ) : (
        <LoadingSVG />
      )}
    </div>
  );
});

export default ProfileManager;
