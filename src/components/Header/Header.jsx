import { useState } from "react";
import Modal from "../Modal/Modal";
import LoginPopup from "./LoginPopup";
import Barbutton from "../Barbutton";
import firebase from "../firebaseConnection";
import "firebase/auth";
import { useHistory, useLocation } from "react-router";
import { useEffect } from "react";

function Header({ userLogged }) {
  const location = useLocation();
  const history = useHistory();

  const [showModal, setModal] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  async function logout() {
    await firebase.auth().signOut();
  }

  useEffect(() => {
    if (location.pathname === "/login") {
      setModal(true);
    } else if (location.pathname === "/signin") {
      setShowSignIn(true);
      setModal(true);
    }
  }, [location]);

  const didClose = () => {
    setModal(false);
    setShowSignIn(false);
    history.push("/");
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
            <button type="button" onClick={() => logout}>
              <div className="btn-sp btn-three">
                <span>{"Logout"}</span>
              </div>
            </button>
          </div>
        ) : (
          <div className="header-login-state-button">
            <Barbutton href={"login"}>{"Login"}</Barbutton>
            <Barbutton href={"signin"}>{"SignIn"}</Barbutton>
          </div>
        )}
      </div>
      {showModal && (
        <Modal
          title={""}
          isOpen={showModal}
          didClose={didClose}
          contentRelation="fit-content"
        >
          <LoginPopup signInMethod={showSignIn} />
        </Modal>
      )}
    </header>
  );
}

export default Header;
