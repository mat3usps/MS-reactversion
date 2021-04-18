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

  storageUser = (object) => {
    localStorage.setItem("loggedUser", JSON.stringify(object));
  };

  async checkLogin() {
    const storageUser = localStorage.getItem("loggedUser");

    if (storageUser) {
      this.setLoggedUser(JSON.parse(storageUser));
    }
  }
}

export default UserStore;
