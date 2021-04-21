import { useState } from "react";
import Barbutton from "../../components/BarButton";
import firebase from "../../components/firebaseConnection";
import "firebase/auth";
import LoadingSVG from "../../components/LoadingSVG";
import { observer } from "mobx-react";
import SignInPopUp from "./SignInPopup";

const LoginPopUp = observer(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [displaySignIn, setDisplaySignIn] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmationMessage, setConfirmationMessage] = useState("");

  function displayConfirmationMessage(message) {
    setConfirmationMessage(message);
    setInterval(() => {
      setConfirmationMessage("");
    }, 5000);
  }

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

  return (
    <div>
      {displaySignIn ? (
        <SignInPopUp />
      ) : (
        <div className="login-popup">
          {!isLoading ? (
            <form>
              <label for="Email" className="nodisplay">
                Email:
              </label>
              <input
                className="modal-input"
                value={email}
                id="Email"
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <label for="Password" className="nodisplay">
                Password:
              </label>
              <input
                className="modal-input"
                id="Password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <p className="input-error">{confirmationMessage}</p>

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
                  <Barbutton onClick={() => setDisplaySignIn(true)}>
                    Sign In
                  </Barbutton>
                </div>
              </div>
            </form>
          ) : (
            <LoadingSVG />
          )}
        </div>
      )}
    </div>
  );
});

export default LoginPopUp;
