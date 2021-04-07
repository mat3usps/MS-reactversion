import { useState } from "react";
import firebase from "../firebaseConnection";

function ProfileManager({ userLogged }) {
  const [nameUpdate, setNameUpdate] = useState("");
  const [passwordUpdate, setPasswordUpdate] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const updatingName = (event) => setNameUpdate(event.target.value);
  const updatingPassword = (event) => setPasswordUpdate(event.target.value);
  const confirmingPassword = (event) =>
    setPasswordConfirmation(event.target.value);

  const nameChanger = (event) => {
    event.preventDefault();
    nameUpdateSubmit();
    setNameUpdate("");
  };

  async function nameUpdateSubmit() {
    let updateConfirmation = document.getElementById(
      "name-update-confirmation"
    );
    await firebase
      .firestore()
      .collection("users")
      .doc(userLogged.uid)
      .update({
        name: nameUpdate,
      })
      .then(() => {
        updateConfirmation.innerHTML = "Name successfully updated.";
        setInterval(() => {
          updateConfirmation.innerHTML = "";
        }, 3000);
      })
      .catch((error) => {
        updateConfirmation.innerHTML = error.message;
        setInterval(() => {
          updateConfirmation.innerHTML = "";
        }, 5000);
      });
  }

  return (
    <div className="profile-manager">
      <form>
        <div className="photo-field">
          <div className="current-profile-photo-div">
            <img src={"props.userLogged.photo"} alt="" />
          </div>
          <br />
          <input type="file"></input>
        </div>
        <div className="profile-name-field">
          <div className="input-group">
            <input
              className="modal-input"
              type="text"
              value={nameUpdate}
              onChange={updatingName}
              placeholder={userLogged.name}
            ></input>
            <button className="modal-input-button" onclick={nameChanger}>
              Update
            </button>
          </div>
          <p id="name-update-confirmation"></p>
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
        </div>
      </form>
    </div>
  );
}

export default ProfileManager;
