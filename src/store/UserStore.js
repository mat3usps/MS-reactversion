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
    console.log("uid", this.uid);
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

          console.log("Did log in");
          this.storeNewAccess();
        } catch (error) {
          console.log("Anonymous user didn't log in", error);
        }
      }
    });
  };

  storeNewAccess = async () => {
    try {
      await firebase.firestore().collection("users").doc(this.uid).set({
        name: "",
        surname: "",
        photo: null,
        cart: [],
      });

      console.log("Did store access");
    } catch (error) {
      console.log("Coundn't store access", error);
    }
  };
}

export default UserStore;
