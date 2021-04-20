import { useState, useEffect } from "react";
import Barbutton from "../../components/BarButton";
import firebase from "../../components/firebaseConnection";
import "firebase/auth";
import LoadingSVG from "../../components/LoadingSVG";
import { observer } from "mobx-react";

const LoginPopUp = observer(({ signInMethod }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showSignIn, setShowSignIn] = useState(false);
  const [firstTry, setFirstTry] = useState(true);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  function displayConfirmationMessage(message) {
    setConfirmationMessage(message);
    setInterval(() => {
      setConfirmationMessage("");
    }, 5000);
  }

  const emailValidation = () => {
    const userEmail = document.getElementById("Email");
    const emailError = document.getElementById("email-error");

    if (userEmail && !firstTry) {
      userEmail.addEventListener("input", function (event) {
        const pattern = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
        const currentValue = event.target.value;
        const valid = pattern.test(currentValue);

        if (valid) {
          emailError.style.display = "none";
        } else {
          emailError.style.display = "block";
        }
      });
    }
  };

  const passwordValidation = () => {
    const userPassword = document.getElementById("Password");
    const passwordError = document.getElementById("password-error");

    if (userPassword && !firstTry) {
      userPassword.addEventListener("input", function (event) {
        const pattern = /^[\w@-]{8,20}$/;
        const currentValue = event.target.value;
        const valid = pattern.test(currentValue);

        if (valid) {
          passwordError.style.display = "none";
        } else {
          passwordError.style.display = "block";
        }
      });
    }
  };

  const userDidLogin = (event) => {
    event.preventDefault();
    setIsLoading(true);
    signIn(email, password);
    setEmail("");
    setPassword("");
  };

  async function signIn() {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("User, did login.");
        setIsLoading(false);
      })
      .catch((error) => {
        displayConfirmationMessage(error.message);
        setIsLoading(false);
      });
  }

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

    await firebase
      .auth()
      .currentUser.linkWithCredential(credential)
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
      })
      .catch((error) => {
        console.log("Error, email verification not sent.", error);
      });
  }

  useEffect(() => {
    if (signInMethod) {
      setShowSignIn(true);
    } else {
      setShowSignIn(false);
    }
  }, [signInMethod]);

  const displaySignIn = () => {
    setShowSignIn(true);
  };

  return (
    <div className="login-popup">
      {!isLoading ? (
        <form>
          {showSignIn && (
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
          )}
          <label for="Email" className="nodisplay">
            Email:{" "}
          </label>
          <input
            className="modal-input"
            value={email}
            id="Email"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            onFocus={showSignIn && emailValidation}
          />
          <p id="email-error" className="input-error validation">
            This is not a valid email.
          </p>
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
            onChange={(e) => setPassword(e.target.value)}
            onFocus={showSignIn && passwordValidation}
          ></input>
          <p id="password-error" className="input-error validation">
            This is not a valid password.
          </p>
          <p className="input-error">{confirmationMessage}</p>
          {showSignIn ? (
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
          ) : (
            <div>
              <div className="login-button-div">
                <button
                  type="submit"
                  className="modal-input-button"
                  onClick={userDidLogin}
                >
                  Login
                </button>
              </div>
              <hr />
              <p className="login-popup-options">Do not have an account?</p>
              <div className="other-login-options">
                <Barbutton onClick={displaySignIn}>Sign In</Barbutton>
              </div>
            </div>
          )}
        </form>
      ) : (
        <LoadingSVG />
      )}
    </div>
  );
});

export default LoginPopUp;
