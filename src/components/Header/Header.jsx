import { useState } from "react";
import Modal from "../Modal/Modal";
import LoginPopup from "./LoginPopup";
import Barbutton from "../Barbutton";
import firebase from "../firebaseConnection";
import "firebase/auth";
import { useEffect } from "react";

function Header({ userLogged }) {
  const [loginStatus, setLoginStatus] = useState(null);

  console.log(userLogged);

  const logout = () => {
    firebase.auth().signOut();
  };

  const didCloseModal = () => {
    setLoginStatus(null);
  };

  useEffect(didCloseModal, [userLogged]);

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
        <h4>Welcome! {userLogged ? userLogged.name : ""}</h4>
      </div>
      <div className="header-login-state">
        {userLogged ? (
          <div className="header-login-state-button">
            <Barbutton href={"profile"}>{"Profile"}</Barbutton>
            <button className="header-profile-button btn-three">
              {userLogged.photo}
            </button>
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
        didClose={didCloseModal}
        contentRelation="fill-content"
      >
        <LoginPopup
          signInMethod={loginStatus === "signin"}
          userLogged={userLogged}
        />
      </Modal>
    </header>
  );
}

export default Header;
