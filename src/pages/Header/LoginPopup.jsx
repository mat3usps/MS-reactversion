import { useState, useEffect } from "react";
import Barbutton from "../../components/BarButton";
import firebase from "../../components/firebaseConnection";
import "firebase/auth";
import LoadingSVG from "../../components/LoadingSVG";
import { observer } from "mobx-react";
import { useUserStoreContext } from "../../contexts/userStoreContext";

const LoginPopUp = observer(({ signInMethod }) => {
  const { loggedUser, setLoggedUser } = useUserStoreContext();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
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

  function storageUser(object) {
    localStorage.setItem("loggedUser", JSON.stringify(object));
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
      .then(async (value) => {
        let uid = value.user.uid;

        const userProfile = await firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .get();

        let data = {
          uid: uid,
          name: userProfile.data().name,
          photo: userProfile.data().photo,
          email: value.user.email,
        };

        setLoggedUser(data);
        storageUser(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("erro ao logar", error);
        setIsLoading(false);
      });
  }

  const userDidSignIn = (event) => {
    event.preventDefault();
    setIsLoading(true);
    createUser(email, password, name);
    setEmail("");
    setPassword("");
  };

  async function createUser(email, password, name) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        await firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .set({
            name: name,
            photo: null,
          })
          .then(() => {
            let data = {
              uid: uid,
              name: name,
              email: value.user.email,
              photo: null,
            };

            setLoggedUser(data);
            storageUser(data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.log("erro ao criar cadastro", error);
            setIsLoading(false);
          });
      });
  }

  const didLoginAnonymously = () => {
    loginAnonymously();
    setIsLoading(true);
  };

  async function loginAnonymously() {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        console.log("User logged in anonymously successfully");
      })
      .catch((error) => {
        console.log("User didn't log in", error);
      });
  }

  /*const didProvideAuthentication = (event) => {
    event.preventDefault();
    var credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    provideAuthentication(credential);
  };

  async function provideAuthentication(credential) {
    firebase
      .auth()
      .currentUser.linkWithCredential(credential)
      .then((usercred) => {
        var user = usercred.user;
        console.log("Anonymous account successfully upgraded", user);
      })
      .catch((error) => {
        setFirstTry(false);
        displayConfirmationMessage(error.message);
        console.log("Error upgrading anonymous account", error);
      });
  }*/

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
              <label for="Name">Name: </label>
              <input
                className="modal-input"
                id="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
              <br />
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
          <p className="input-error">{confirmationMessage}</p>
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
              <p className="login-popup-options">Do not have an account?</p>
              <div className="other-login-options">
                <Barbutton onClick={displaySignIn}>Sign In</Barbutton>
                <Barbutton onClick={didLoginAnonymously}>Anonymous</Barbutton>
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
