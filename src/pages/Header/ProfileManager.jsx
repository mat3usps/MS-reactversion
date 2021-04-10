import { useState } from "react";
import firebase from "../../components/firebaseConnection";

function ProfileManager({ userLogged }) {
  const [nameUpdate, setNameUpdate] = useState("");
  const [passwordUpdate, setPasswordUpdate] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function updateConfirmation(message) {
    setSuccessMessage(message);
    setInterval(() => {
      setSuccessMessage("");
    }, 5000);
  }

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
    await firebase
      .firestore()
      .collection("users")
      .doc(userLogged.uid)
      .update({
        name: nameUpdate,
      })
      .then(() => {
        updateConfirmation("Name was updated");
      })
      .catch((error) => {
        updateConfirmation(error.message);
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
          <input type="file" onChange={""}></input>
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
            <br />
            <button className="modal-input-button" onClick={nameChanger}>
              Update
            </button>
          </div>
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
    </div>
  );
}

export default ProfileManager;
