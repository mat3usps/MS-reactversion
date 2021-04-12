import { useState } from "react";
import firebase from "../../components/firebaseConnection";
import LoadingSVG from "../../components/LoadingSVG";

function ProfileManager({ userLogged }) {
  const [isLoading, setIsLoading] = useState(false);
  const [nameUpdate, setNameUpdate] = useState("");
  const [passwordUpdate, setPasswordUpdate] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [photoUpdate, setPhotoUpdate] = useState("");

  function updateConfirmation(message) {
    setSuccessMessage(message);
    setInterval(() => {
      setSuccessMessage("");
    }, 5000);
  }

  const updateRef = firebase
    .firestore()
    .collection("users")
    .doc(userLogged.uid);

  const updatingName = (event) => setNameUpdate(event.target.value);
  const updatingPassword = (event) => setPasswordUpdate(event.target.value);
  const confirmingPassword = (event) =>
    setPasswordConfirmation(event.target.value);
  const updatingPhoto = (event) => {
    if (event.target.files[0]) {
      setPhotoUpdate(event.target.files[0]);
    }
  };

  const didUpdatePhoto = () => {
    setIsLoading(true);
    const uploadTask = firebase
      .storage()
      .ref(`userPhotos/${userLogged.uid}`)
      .put(photoUpdate);
    uploadTask.on(
      "state_changed",
      () => {
        console.log("photoUpdated");
      },
      (error) => {
        console.log(error);
      },
      () => {
        firebase
          .storage()
          .ref("userPhotos")
          .child(photoUpdate.uid)
          .getDownloadURL()
          .then((url) => {
            updateRef
              .update({
                photo: url,
              })
              .then(() => {
                setIsLoading(false);
                updateConfirmation("Photo was updated");
              })
              .catch((error) => {
                setIsLoading(false);
                updateConfirmation(error.message);
              });
          });
      }
    );
  };

  const didUpdateName = (event) => {
    event.preventDefault();
    setIsLoading(true);
    nameUpdateSubmit();
    setNameUpdate("");
  };

  async function nameUpdateSubmit() {
    updateRef
      .update({
        name: nameUpdate,
      })
      .then(() => {
        setIsLoading(false);
        updateConfirmation("Name was updated");
      })
      .catch((error) => {
        setIsLoading(false);
        updateConfirmation(error.message);
      });
  }

  return (
    <div className="profile-manager">
      {!isLoading ? (
        <form>
          <div className="photo-field">
            <div className="current-profile-photo-div">
              <img
                className="profile-current-photo"
                src={userLogged.photo}
                alt={userLogged.name}
              />
            </div>
            <div className="photo-input">
              <input
                className="modal-input"
                type="file"
                onChange={updatingPhoto}
              ></input>
              <button
                type="button"
                className="modal-input-button"
                onClick={didUpdatePhoto}
              >
                Update Photo
              </button>
            </div>
          </div>
          <div className="profile-name-field">
            <input
              className="modal-input"
              type="text"
              value={nameUpdate}
              onChange={updatingName}
              placeholder={userLogged.name}
            ></input>
            <button
              type="button"
              className="modal-input-button"
              onClick={didUpdateName}
            >
              Update Name
            </button>
          </div>
          <div className="profile-password-field">
            <input
              id="password"
              className="modal-input"
              type="password"
              placeholder="Password"
              value={passwordUpdate}
              onChange={updatingPassword}
            ></input>
            <br />
            <input
              type="password"
              className="modal-input"
              placeholder="Confirm password"
              value={passwordConfirmation}
              onChange={confirmingPassword}
            ></input>
            <hr />
            <p>{successMessage}</p>
          </div>
        </form>
      ) : (
        <LoadingSVG />
      )}
    </div>
  );
}

export default ProfileManager;
