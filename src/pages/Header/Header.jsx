import { useState, useEffect, useContext } from "react";
import Modal from "../../components/Modal";
import LoginPopup from "./LoginPopup";
import BarButton from "../../components/BarButton";
import firebase from "../../components/firebaseConnection";
import "firebase/auth";
import ProfileManager from "./ProfileManager";
import { UserContext } from "../../contexts/user";

function Header() {
  const { userLogged } = useContext(UserContext);
  const [loginStatus, setLoginStatus] = useState(null);
  const [profileManager, setprofileManager] = useState(false);
  const [headerProfileOptions, setHeaderProfileOptions] = useState(false);
  const [anonymousAuthentication, setAnonymousAuthentication] = useState(false);

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
    if (!headerProfileOptions) {
      setHeaderProfileOptions(true);
    } else {
      setHeaderProfileOptions(false);
    }
  };

  const displayProfileManager = () => {
    setprofileManager(true);
  };

  const didCloseProfileManager = () => {
    setprofileManager(false);
  };

  const provideAuthentication = () => {
    setAnonymousAuthentication(true);
  };

  const didCloseAnonymousAuthentication = () => {
    setAnonymousAuthentication(false);
  };

  return (
    <header className="header">
      <div></div>
      <div>
        <h4>Welcome{userLogged ? `, ${userLogged.name}!` : ""}</h4>
      </div>
      <div className="header-login-state">
        {userLogged ? (
          <div className="header-login-state-button">
            {userLogged.isAnonymous && (
              <BarButton onClick={provideAuthentication}>Sign In</BarButton>
            )}
            <button
              className="header-profile-button btn-three"
              onClick={displayHiddenDiv}
            >
              <img
                src={userLogged.photo}
                alt={userLogged.name ? userLogged.name[0] : "A"}
              />
            </button>
            {headerProfileOptions && (
              <div className="header-profile-hidden-div">
                {!userLogged.isAnonymous && (
                  <BarButton onClick={displayProfileManager}>Profile</BarButton>
                )}
                <BarButton onClick={didLogout}>Logout</BarButton>
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
      <Modal
        isOpen={anonymousAuthentication}
        didClose={didCloseAnonymousAuthentication}
        contentRelation="fill-content"
      >
        <LoginPopup signInMethod={true} />
      </Modal>
    </header>
  );
}

export default Header;
