import { useState, useEffect } from "react";
import Barbutton from "../Barbutton";
import firebase from "../firebaseConnection";
import "firebase/auth";

function LoginPopUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);

  const photoHandler = (event) => {
    event.preventDefault();
    setPhoto(event.target.files[0]);
  };

  const userDidLogin = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword();
  };

  async function signInWithEmailAndPassword() {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("login realizado com sucesso");
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  const userDidSignIn = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword();
  };

  async function createUserWithEmailAndPassword() {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (value) => {
        let nome = value.user.email.split("@");
        await firebase.firestore().collection("users").doc(value.user.uid).set({
          nome: nome[0],
          photo: photo,
        });
      })
      .catch((error) => {});
  }

  useEffect(() => {
    if (props.signInMethod) {
      setShowSignIn(true);
    } else {
      setShowSignIn(false);
    }
  }, []);

  const displaySignIn = () => {
    setShowSignIn(true);
  };

  return (
    <div className="login-popup">
      <form>
        {showSignIn && (
          <div>
            <label for="Photo">Photo: </label>
            <br />
            <input
              id="Photo"
              value={photo}
              type="file"
              enctype="multipart/form-data"
              onChange={photoHandler}
            ></input>
          </div>
        )}
        <label for="Email">Email: </label>
        <input
          className="login-input"
          value={email}
          id="Email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <p id="email-error" className="input-error">
          This email is not valid.
        </p>
        <br />
        <label for="Password">Password: </label>
        <input
          className="login-input"
          id="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <p id="password-error" className="input-error">
          This password is not valid.
        </p>
        {showSignIn ? (
          <div>
            <div className="login-button-div">
              <button
                type="submit"
                className="modal-login-button"
                onClick={userDidSignIn}
              >
                Sign In
              </button>
            </div>
            <div>
              <p>{"errorReason"}</p>
            </div>
          </div>
        ) : (
          <div>
            <div className="login-button-div">
              <button
                type="submit"
                className="modal-login-button"
                onClick={userDidLogin}
              >
                Login
              </button>
            </div>
            <hr />
            <di>
              <p>Does not have an account?</p>
              <Barbutton onClick={displaySignIn}>Sign In</Barbutton>
            </di>
          </div>
        )}
      </form>
    </div>
  );
}

export default LoginPopUp;
