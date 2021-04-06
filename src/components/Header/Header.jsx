import { useState } from "react";
import Modal from "../Modal/Modal";
import LoginPopup from "./LoginPopup";
import Barbutton from "../Barbutton";
import firebase from "../firebaseConnection";
import "firebase/auth";
import { useEffect } from "react";

function Header({ userLogged }) {
  const [loginStatus, setLoginStatus] = useState(null);

  const logout = () => {
    firebase.auth().signOut();
  };

  const didClose = () => {
    setLoginStatus(null);
  };

  useEffect(didClose, [userLogged]);

  const displaySignIn = () => {
    setLoginStatus("signin");
  };

  const displayLogin = () => {
    setLoginStatus("login");
  };

  return (
    <header className="header">
      <div></div>
      <div>
        <h4>Welcome!</h4>
      </div>
      <div className="header-login-state">
        {userLogged ? (
          <div className="header-login-state-button">
            <Barbutton href={"profile"}>{"Profile"}</Barbutton>
            <Barbutton onClick={logout}>Logout</Barbutton>
          </div>
        ) : (
          <div className="header-login-state-button">
            <Barbutton onClick={displayLogin}>Login</Barbutton>
            <Barbutton onClick={displaySignIn}>Sign In</Barbutton>
          </div>
        )}
      </div>
      <Modal
        title={""}
        isOpen={loginStatus}
        didClose={didClose}
        contentRelation="fill-content"
      >
        <LoginPopup signInMethod={loginStatus === "signin"} />
      </Modal>
    </header>
  );
}

export default Header;
