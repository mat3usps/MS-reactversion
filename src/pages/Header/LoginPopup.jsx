import { useState, useEffect } from "react";
import Barbutton from "../../components/BarButton";
import firebase from "../../components/firebaseConnection";
import "firebase/auth";

function LoginPopUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [firstTry, setFirstTry] = useState(true);

  console.log("first", firstTry);

  const photoHandler = (event) => {
    event.preventDefault();
    setPhoto(event.target.files[0]);
  };

  const userDidLogin = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword();
    setEmail("");
    setPassword("");
  };

  const authenticationErrorWarning = document.getElementById(
    "authentication-error"
  );

  async function signInWithEmailAndPassword() {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("usuário logou");
      })
      .catch((error) => {
        authenticationErrorWarning.innerHTML = error.message;
        setInterval(() => {
          authenticationErrorWarning.innerHTML = "";
        }, 7000);
      });
  }

  const emailValidation = () => {
    const userEmail = document.getElementById("Email");
    const emailError = document.getElementById("email-error");

    if (userEmail && !firstTry) {
      userEmail.addEventListener("input", function (event) {
        const pattern = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
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

  const userDidSignIn = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword();
    setEmail("");
    setPassword("");
  };

  async function createUserWithEmailAndPassword() {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (value) => {
        let name = value.user.email.split("@");
        await firebase
          .firestore()
          .collection("users")
          .doc(value.user.uid)
          .set({
            name: name[0],
            photo: name[0][0],
            email: value.user.email,
            uid: value.user.uid,
          })
          .then(console.log("cadastrado com sucesso."));
      })
      .catch((error) => {
        authenticationErrorWarning.innerHTML = error.message;
        setFirstTry(false);
        setInterval(() => {
          authenticationErrorWarning.innerHTML = "";
        }, 7000);
      });
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
          className="modal-input"
          value={email}
          id="Email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          onFocus={showSignIn && emailValidation}
        />
        <p id="email-error" className="input-error validation">
          This is not a valid email.
        </p>
        <br />
        <label for="Password">Password: </label>
        <input
          className="modal-input"
          id="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={showSignIn && passwordValidation}
        ></input>
        <p id="password-error" className="input-error validation">
          This is not a valid password.
        </p>
        <p id="authentication-error" className="input-error"></p>
        {showSignIn ? (
          <div>
            <div className="login-button-div">
              <button
                type="submit"
                className="modal-input-button"
                onClick={userDidSignIn}
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
