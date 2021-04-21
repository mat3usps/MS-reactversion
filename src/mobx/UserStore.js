import { makeObservable, observable, action } from "mobx";
import firebase from "../components/firebaseConnection";
import "firebase/auth";

class UserStore {
  loggedUser = null;

  constructor() {
    makeObservable(this, {
      loggedUser: observable,
      setLoggedUser: action,
    });
    this.checkLogin();
  }

  setLoggedUser = (user) => {
    this.loggedUser = user;
  };

  async checkLogin() {
    firebase.auth().onAuthStateChanged(async (value) => {
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

        this.setLoggedUser(user);
      } else {
        try {
          await firebase.auth().signInAnonymously();
        } catch (error) {
          console.log("Anonymous user didn't log in", error);
        }
      }

      this.setLoggedUser(user);
    });
  }
}

export default UserStore;
