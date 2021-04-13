import { useState, createContext } from "react";
import firebase from "../components/firebaseConnection";
import "firebase/auth";

export const UserContext = createContext({});

function UserProvider({ children }) {
  const [userLogged, setUserLogged] = useState(null);

  async function checkLogin() {
    await firebase.auth().onAuthStateChanged(async (value) => {
      let user = value;
      if (value) {
        try {
          const snapshot = await firebase
            .firestore()
            .collection("users")
            .doc(value.uid)
            .get();

          user = {
            ...value,
            ...snapshot.data(),
          };
        } catch (error) {
          console.error("onAuthStateChanged", error);
        }
      }
      setUserLogged(user);
    });
  }

  checkLogin();

  return (
    <UserContext.Provider value={{ userLogged }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
