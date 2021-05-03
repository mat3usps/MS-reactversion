import { useState } from "react";
import Barbutton from "../../components/BarButton";
import LoadingSVG from "../../components/LoadingSVG";
import { observer } from "mobx-react";
import SignInPopUp from "./SignInPopup";
import { useMainStoreContext } from "../../contexts/mainStoreContext";

const LoginPopUp = observer(() => {
  const { authStore } = useMainStoreContext();
  const { signIn, isLoading } = authStore;

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

  const didSignIn = async () => {
    setEmail("");
    setPassword("");
    const error = await signIn(email, password);
    console.log("error", error);
    if (error) {
      displayConfirmationMessage(error);
    }
  };

  const userDidLogin = (event) => {
    event.preventDefault();
    didSignIn();
  };

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
