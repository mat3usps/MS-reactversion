import { useState, useEffect } from "react";
import avatar from "../../assets/Utility/avatar.png";
import Modal from "../../components/Modal";
import LoginPopup from "./LoginPopup";
import BarButton from "../../components/BarButton";
import firebase from "../../components/firebaseConnection";
import "firebase/auth";
import ProfileManager from "./ProfileManager";
import { observer } from "mobx-react";
import { useUserStoreContext } from "../../contexts/userStoreContext";

const Header = observer(() => {
  const { loggedUser } = useUserStoreContext();

  const [loginStatus, setLoginStatus] = useState(null);
  const [profileManager, setprofileManager] = useState(false);
  const [headerProfileOptions, setHeaderProfileOptions] = useState(false);

  const didLogout = () => {
    firebase.auth().signOut();
  };

  const didCloseLoginPopup = () => {
    setLoginStatus(null);
  };

  useEffect(didCloseLoginPopup, [loggedUser]);

  const displaySignIn = () => {
    setLoginStatus("signin");
  };

  const displayLogin = () => {
    setLoginStatus("login");
  };

  const displayHiddenDiv = () => {
    if (!headerProfileOptions) {
      setHeaderProfileOptions(true);
    } else {
      setHeaderProfileOptions(false);
    }
  };

  const displayProfileManager = () => {
    setHeaderProfileOptions(false);
    setprofileManager(true);
  };

  const didCloseProfileManager = () => {
    setprofileManager(false);
  };

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

  const anonymous = loggedUser ? loggedUser.isAnonymous : "";

  return (
    <header className="header">
      <div></div>
      <div>
        <h4>
          Welcome
          {loggedUser && loggedUser.name !== undefined
            ? `, ${loggedUser.name}!`
            : ""}
        </h4>
      </div>
      <div className="header-login-state">
        {!anonymous ? (
          <div className="header-login-state-button">
            <button
              className="header-profile-button btn-three"
              onClick={displayHiddenDiv}
            >
              {loggedUser &&
                (loggedUser.photo === null ? (
                  <img src={avatar} alt="User's" />
                ) : (
                  <img src={loggedUser.photo} alt="User's" />
                ))}
            </button>
            {headerProfileOptions && (
              <div className="header-profile-hidden-div">
                <BarButton onClick={displayProfileManager}>Profile</BarButton>
                <BarButton onClick={didLogout}>Logout</BarButton>
                {!loggedUser.emailVerified && (
                  <BarButton onClick={sendEmailVerification}>
                    <h6>Verify</h6>
                    <h6>your email</h6>
                  </BarButton>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="header-login-state-button">
            <BarButton onClick={displayLogin}>Login</BarButton>
            <BarButton onClick={displaySignIn}>Sign In</BarButton>
          </div>
        )}
      </div>
      <Modal
        isOpen={loginStatus}
        didClose={didCloseLoginPopup}
        contentRelation="fill-content"
      >
        <LoginPopup signInMethod={loginStatus === "signin"} />
      </Modal>
      <Modal
        isOpen={profileManager}
        didClose={didCloseProfileManager}
        contentRelation="scroll"
      >
        <ProfileManager />
      </Modal>
    </header>
  );
});

export default Header;
