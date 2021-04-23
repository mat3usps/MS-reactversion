import { useState } from "react";
import SecondaryInfo from "./SecondaryInfo";
import avatar from "../../assets/Utility/avatar.png";
import upload from "../../assets/Utility/upload.svg";
import firebase from "../../components/firebaseConnection";
import LoadingSVG from "../../components/LoadingSVG";
import { observer } from "mobx-react";
import { useUserStoreContext } from "../../contexts/userStoreContext";

const ProfileManager = observer(() => {
  const {
    loggedUser,
    handlePhotoUpload,
    handleNameUpdate,
    userDeleting,
    isLoading,
  } = useUserStoreContext();

  const [displaySecondaryInfo, setSecondaryInfo] = useState(false);

  const [nameToUpdate, setNameToUpdate] = useState(
    loggedUser && loggedUser.name
  );
  const [surnameToUpdate, setSurnameToUpdate] = useState(
    loggedUser && loggedUser.surname
  );
  const [photoToUpdate, setPhotoToUpdate] = useState(
    loggedUser && loggedUser.photo
  );
  const [currentPhoto, setCurrentPhoto] = useState(
    loggedUser && loggedUser.photo
  );

  const [passwordUpdate, setPasswordUpdate] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordConfirming, setPasswordConfirming] = useState("");

  const passwordValidation = () => {
    const userPassword = document.getElementById("password");

    userPassword.addEventListener("input", (event) => {
      const pattern = /^[\w@-]{8,20}$/;
      const currentValue = event.target.value;
      const valid = pattern.test(currentValue);

      if (valid) {
        setPasswordConfirming("");
      } else {
        setPasswordConfirming("Your password must have from 8 to 20 digits.");
      }
    });
  };

  const confirmationValidation = (event) => {
    if (event.target.value !== passwordUpdate) {
      setPasswordConfirming("The confirmation is not equal to password.");
    } else {
      setPasswordConfirming("");
    }
  };

  const handleFile = (event) => {
    event.preventDefault();
    if (event.target.files[0]) {
      const image = event.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        setPhotoToUpdate(image);
        setCurrentPhoto(URL.createObjectURL(event.target.files[0]));
      } else {
        alert("Envie uma imagem do tipo PNG ou JPEG");
        setPhotoToUpdate(null);
        return null;
      }
    }
  };

  const didUploadPhoto = (event) => {
    event.preventDefault();
    handlePhotoUpload(photoToUpdate);
  };

  const didUpdateName = (event) => {
    event.preventDefault();
    handleNameUpdate();
  };

  async function passwordReset(password) {
    const currentUser = await firebase.auth().currentUser;

    if (currentUser) {
      currentUser
        .updatePassword(password)
        .then(() => {
          console.log("password successfully changed");
        })
        .catch((error) => {
          console.log("error, password was not updated", error.message);
        });
    }
  }

  const resetPassword = (event) => {
    event.preventDefault();
    passwordReset(passwordUpdate);
  };

  const deleteAccount = (event) => {
    event.preventDefault();
    userDeleting();
  };

  if (isLoading) {
    return (
      <div className="profile-manager">
        <LoadingSVG />
      </div>
    );
  }

  return (
    <div className="profile-manager">
      {!displaySecondaryInfo ? (
        <div>
          <button
            className="modal-input-button"
            type="button"
            onClick={(e) => setSecondaryInfo(true)}
          >
            More Info
          </button>
          <form className="form-profile">
            <label className="label-avatar">
              <input type="file" accept="image/*" onChange={handleFile} />
              <span>
                <img src={upload} alt="" />
              </span>
              <br />
              {loggedUser.photo === null ? (
                <img src={avatar} width="300" height="300" alt="User's" />
              ) : (
                <img src={currentPhoto} width="300" height="300" alt="User's" />
              )}
            </label>
            <button
              className="modal-input-button"
              type="submit"
              onClick={didUploadPhoto}
            >
              Upload Photo
            </button>

            <div>
              <div className="name-input-group">
                <label for="Name" className="nodisplay">
                  Name:
                </label>
                <input
                  className="modal-input"
                  id="Name"
                  type="text"
                  value={nameToUpdate}
                  placeholder="Name"
                  onChange={(event) => setNameToUpdate(event.target.value)}
                ></input>
              </div>
              <div className="name-input-group">
                <label for="Surname" className="nodisplay">
                  Surname:
                </label>
                <input
                  className="modal-input"
                  id="Surname"
                  type="text"
                  value={surnameToUpdate}
                  placeholder="Surname"
                  onChange={(event) => setSurnameToUpdate(event.target.value)}
                ></input>
              </div>
            </div>

            <button
              className="modal-input-button"
              type="submit"
              onClick={didUpdateName}
            >
              Update Name
            </button>
          </form>
          <div className="profile-password-field">
            <input
              id="password"
              className="modal-input"
              type="password"
              placeholder="Password"
              value={passwordUpdate}
              onChange={(event) => setPasswordUpdate(event.target.value)}
              onFocus={passwordValidation}
            />
            <br />
            <input
              type="password"
              className="modal-input"
              placeholder="Confirm password"
              value={passwordConfirmation}
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              onFocus={confirmationValidation}
            />
            <p className="input-error">{passwordConfirming}</p>
            <br />
            <button
              type="button"
              className="modal-input-button"
              onClick={resetPassword}
            >
              Reset Password
            </button>
          </div>
          <button
            type="button"
            className="modal-input-button"
            onClick={deleteAccount}
          >
            Delete Account
          </button>
        </div>
      ) : (
        <div>
          <button
            className="modal-input-button"
            type="button"
            onClick={(e) => setSecondaryInfo(false)}
          >
            Main Info
          </button>
          <SecondaryInfo />
        </div>
      )}
    </div>
  );
});

export default ProfileManager;
