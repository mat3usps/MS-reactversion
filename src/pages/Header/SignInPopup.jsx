import { useState } from "react";
import firebase from "../../components/firebaseConnection";
import "firebase/auth";
import LoadingSVG from "../../components/LoadingSVG";
import { observer } from "mobx-react";
import { useUserStoreContext } from "../../contexts/userStoreContext";

const SignInPopUp = observer(() => {
  const { setLoggedUser } = useUserStoreContext();
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validationMessage, setValidationMessage] = useState("");
  const [firstTry, setFirstTry] = useState(true);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  function displayConfirmationMessage(message) {
    setConfirmationMessage(message);
    setInterval(() => {
      setConfirmationMessage("");
    }, 5000);
  }

  const emailValidation = (event, firstTry) => {
    setEmail(event.target.value);

    if (!firstTry) {
      const pattern = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
      const valid = pattern.test(event.target.value);

      if (valid) {
        setValidationMessage("");
      } else {
        setValidationMessage("This is not a valid email.");
      }
    }
  };

  const passwordValidation = (event, firstTry) => {
    setPassword(event.target.value);

    if (!firstTry) {
      const pattern = /^[\w@-]{8,20}$/;
      const valid = pattern.test(event.target.value);

      if (valid) {
        setValidationMessage("");
      } else {
        setValidationMessage("This is not a valid password.");
      }
    }
  };

  const userDidAuthenticate = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setFirstTry(false);
    authenticateUser(email, password, name, surname);
  };

  async function authenticateUser(email, password, name, surname) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );

    const auth = firebase.auth();

    auth.currentUser
      .linkWithCredential(credential)
      .then(async (value) => {
        let uid = value.user.uid;

        storingNewUser(uid, name, surname);
      })
      .catch((error) => {
        console.log("Error on linking credentials", error);
        setIsLoading(false);
        setFirstTry(false);
        displayConfirmationMessage(error.message);
      });
  }

  async function storingNewUser(uid, name, surname) {
    await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .set({
        name: name,
        surname: surname,
        photo: null,
      })
      .then(() => {
        setIsLoading(false);

        sendEmailVerification();
      })
      .catch((error) => {
        console.log("Error on setting new user", error);
        setIsLoading(false);
      });
  }

  async function sendEmailVerification() {
    const user = await firebase.auth().currentUser;
    user
      .sendEmailVerification()
      .then(() => {
        console.log("Email verification sent successfully.");

        userRefresh();
      })
      .catch((error) => {
        console.log("Error, email verification not sent.", error);
      });
  }

  async function userRefresh() {
    firebase.auth().onAuthStateChanged(async (value) => {
      let user = value;
      if (value) {
        try {
          const snapshot = await firebase
            .firestore()
            .collection("users")
            .doc(value.uid)
            .get();
          user = {
            ...value,
            ...snapshot.data(),
          };
        } catch (error) {
          console.error("onAuthStateChanged", error);
        }

        setLoggedUser(user);
      }
    });
  }

  return (
    <div className="login-popup">
      {!isLoading ? (
        <form>
          <div>
            <div className="name-input-group">
              <label for="Name" className="nodisplay">
                Name:
              </label>
              <input
                className="modal-input"
                id="Name"
                type="text"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
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
                value={surname}
                placeholder="Surname"
                onChange={(e) => setSurname(e.target.value)}
              ></input>
            </div>
          </div>
          <label for="Email" className="nodisplay">
            Email:{" "}
          </label>
          <input
            className="modal-input"
            value={email}
            id="Email"
            type="text"
            placeholder="Email"
            onChange={(event) => emailValidation(event, firstTry)}
          />
          <br />
          <label for="Password" className="nodisplay">
            Password:{" "}
          </label>
          <input
            className="modal-input"
            id="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => passwordValidation(event, firstTry)}
          ></input>
          <p className="input-error">{validationMessage}</p>
          <p className="input-error">{confirmationMessage}</p>
          <div>
            <div className="login-button-div">
              <button
                type="submit"
                className="modal-input-button"
                onClick={userDidAuthenticate}
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
      ) : (
        <LoadingSVG />
      )}
    </div>
  );
});

export default SignInPopUp;
