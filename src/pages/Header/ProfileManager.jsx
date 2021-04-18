import { useState } from "react";
import SecondaryInfo from "./SecondaryInfo";
import avatar from "../../assets/Utility/avatar.png";
import upload from "../../assets/Utility/upload.svg";
import firebase from "../../components/firebaseConnection";
import LoadingSVG from "../../components/LoadingSVG";
import { observer } from "mobx-react";
import { useUserStoreContext } from "../../contexts/userStoreContext";

const ProfileManager = observer(() => {
  const { loggedUser, setLoggedUser, storageUser } = useUserStoreContext();

  const [isLoading, setIsLoading] = useState(false);
  const [displaySecondaryInfo, setSecondaryInfo] = useState(true);

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

  const fullName = nameToUpdate + surnameToUpdate;

  const [passwordUpdate, setPasswordUpdate] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

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
                surname: surnameToUpdate,
              })
              .then(() => {
                setIsLoading(false);

                let data = {
                  ...loggedUser,
                  photo: urlPhoto,
                  name: nameToUpdate,
                  surname: surnameToUpdate,
                };

                setLoggedUser(data);
                storageUser(data);
              })
              .catch((error) => {
                setIsLoading(false);
                console.log("error", error);
              });
          })
          .catch((error) => {
            setIsLoading(false);
            console.log("error", error);
          });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("error", error);
      });
  }

  async function handleSave(e) {
    e.preventDefault();
    setIsLoading(true);

    if (photoToUpdate === null && fullName !== "") {
      await firebase
        .firestore()
        .collection("users")
        .doc(loggedUser.uid)
        .update({
          name: nameToUpdate,
          surname: surnameToUpdate,
        })
        .then(() => {
          setIsLoading(false);

          let data = {
            ...loggedUser,
            name: nameToUpdate,
            surname: surnameToUpdate,
          };

          setLoggedUser(data);
          storageUser(data);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    } else if (fullName !== "" && photoToUpdate !== null) {
      handleUpload();
    }
  }

  const shouldLoad = (value) => {
    setIsLoading(value);
  };

  {
    if (isLoading) {
      return (
        <div className="profile-manager">
          <LoadingSVG />
        </div>
      );
    }
  }

  return (
    <div className="profile-manager">
      {!displaySecondaryInfo ? (
        <div>
          <form className="form-profile" onSubmit={handleSave}>
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
                  onChange={(e) => setNameToUpdate(e.target.value)}
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
                  onChange={(e) => setSurnameToUpdate(e.target.value)}
                ></input>
              </div>
            </div>

            <button className="modal-input-button" type="submit">
              Update
            </button>
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
          </div>
        </div>
      ) : (
        <div>
          <SecondaryInfo isLoading={shouldLoad} />
        </div>
      )}
    </div>
  );
});

export default ProfileManager;
