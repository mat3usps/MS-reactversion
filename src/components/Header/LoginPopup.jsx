import { useState } from "react";
import firebase from "../firebaseConnection";
import "firebase/auth";

function LoginPopUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function userDidLogin() {
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

  async function userDidSignIn() {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Cadastrado com sucesso.");
      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          alert("Digite uma senha mais forte.");
        } else if (error.code === "auth/email-already-in-use") {
          alert("Este email já está sendo utilizado.");
        } else if (error.code === "auth/invalid-email") {
          alert("O email que você tentou cadastrar é inválido");
        } else {
          console.log("error", error);
        }
      });
  }

  return (
    <div className="home-popup">
      <div className="login-popup">
        <form>
          <label for="Email">Email: </label>
          <input
            className="login-input"
            value={email}
            id="Email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label for="Password">Password: </label>
          <input
            className="login-input"
            id="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {props.signInMethod ? (
            <div className="login-button-div">
              <button
                type="submit"
                className="modal-login-button"
                onClick={userDidSignIn}
              >
                Sign In
              </button>
            </div>
          ) : (
            <div className="login-button-div">
              <button
                type="submit"
                className="modal-login-button"
                onClick={userDidLogin}
              >
                Login
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default LoginPopUp;
