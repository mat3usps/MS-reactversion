import { makeObservable, observable, action, computed, reaction } from "mobx";
import firebase from "../components/firebaseConnection";
import "firebase/auth";

class UserStore {
  loggedUser = null;

  constructor() {
    makeObservable(this, {
      loggedUser: observable,
      setLoggedUser: action,
      uid: computed,
    });
    this.checkLogin();
    reaction(
      () => this.uid,
      (uid) => {
        let disconnect = null;
        if (uid) {
          const authUser = this.loggedUser;

          disconnect = firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .onSnapshot((userData) => {
              let user = {};

              user = {
                ...authUser,
                ...userData.data(),
              };

              this.setLoggedUser(user);
            });
        } else if (disconnect) {
          disconnect();
        }
      }
    );
  }

  setLoggedUser = (user) => {
    this.loggedUser = user;
  };

  get uid() {
    if (this.loggedUser) {
      return this.loggedUser.uid;
    }
    return null;
  }

  checkLogin = async () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.setLoggedUser(user);
      } else {
        try {
          await firebase.auth().signInAnonymously();
        } catch (error) {
          console.log("Anonymous user didn't log in", error);
        }
      }
    });
  };
}

export default UserStore;
