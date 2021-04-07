import { useState } from "react";
import Modal from "../Modal/Modal";
import LoginPopup from "./LoginPopup";
import Barbutton from "../Barbutton";
import firebase from "../firebaseConnection";
import "firebase/auth";
import { useEffect } from "react";
import ProfileManager from "./ProfileManager";

function Header({ userLogged }) {
  const [loginStatus, setLoginStatus] = useState(null);
  const [profileManager, setprofileManager] = useState(false);

  const didLogout = () => {
    firebase.auth().signOut();
  };

  const didCloseLoginPopup = () => {
    setLoginStatus(null);
  };

  useEffect(didCloseLoginPopup, [userLogged]);

  const displaySignIn = () => {
    setLoginStatus("signin");
  };

  const displayLogin = () => {
    setLoginStatus("login");
  };

  const displayHiddenDiv = () => {
    const hiddenDiv = document.getElementById("hiddendiv");
    if (hiddenDiv.style.getPropertyValue("display") === "none") {
      hiddenDiv.style.display = "block";
    } else {
      hiddenDiv.style.display = "none";
    }
  };

  const displayProfileManager = () => {
    setprofileManager(true);
  };

  const didCloseProfileManager = () => {
    setprofileManager(false);
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
            <button
              className="header-profile-button btn-three"
              onClick={displayHiddenDiv}
            >
              {String(userLogged.photo).toUpperCase()}
            </button>
            <div id="hiddendiv" className="header-profile-hidden-div">
              <Barbutton onClick={displayProfileManager}>Profile</Barbutton>
              <Barbutton onClick={didLogout}>Logout</Barbutton>
            </div>
          </div>
        ) : (
          <div className="header-login-state-button">
            <Barbutton onClick={displayLogin}>Login</Barbutton>
            <Barbutton onClick={displaySignIn}>Sign In</Barbutton>
          </div>
        )}
      </div>
      <Modal
        isOpen={loginStatus}
        didClose={didCloseLoginPopup}
        contentRelation="fill-content"
      >
        <LoginPopup
          signInMethod={loginStatus === "signin"}
          userLogged={userLogged}
        />
      </Modal>
      <Modal
        isOpen={profileManager}
        didClose={didCloseProfileManager}
        contentRelation="fill-content"
      >
        <ProfileManager userLogged={userLogged} />
      </Modal>
    </header>
  );
}

export default Header;
