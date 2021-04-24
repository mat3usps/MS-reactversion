import { makeObservable, observable, action, computed, reaction } from "mobx";
import firebase from "../components/firebaseConnection";
import "firebase/auth";
import Painting from "../pages/Paintings/Painting";

class UserStore {
  loggedUser = null;
  isLoading = false;
  store = false;
  userCart = [
    { name: Painting, price: 500.0, description: Painting, image: "" },
  ];

  constructor() {
    makeObservable(this, {
      loggedUser: observable,
      isLoading: observable,
      userCart: observable,
      setLoggedUser: action,
      setIsLoading: action,
      addToCart: action,
      uid: computed,
      totalPrice: computed,
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

  setIsLoading = (value) => {
    this.isLoading = value;
  };

  setStore = (value) => {
    this.store = value;
  };

  addToCart = (item) => {
    this.userCart.push({
      ...item,
    });
  };

  removeFromCart = (name) => {
    this.userCart.search(() => {});
  };

  get uid() {
    if (this.loggedUser) {
      return this.loggedUser.uid;
    }
    return null;
  }

  get totalPrice() {
    if (this.userCart.length > 0) {
      let amount = 0;
      this.userCart.forEach((item) => {
        amount += item.price;
      });
      return amount;
    }
    return 0;
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

  signIn = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("User, didn't login.", error);

      return error.message;
    } finally {
      this.setIsLoading(false);
    }
  };

  authenticateUser = (email, password, name, surname) => {
    this.setIsLoading(true);
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );

    const auth = firebase.auth();

    try {
      const user = auth.currentUser.linkWithCredential(credential);

      const uid = user.uid;
      this.setLoggedUser(user);
      this.storingNewUser(uid, name, surname);
    } catch (error) {
      console.log("Error on linking credentials", error);

      return error.message;
    } finally {
      this.setIsLoading(false);
    }
  };

  storingNewUser = async (uid, name, surname) => {
    try {
      await firebase.firestore().collection("users").doc(uid).set({
        name: name,
        surname: surname,
        photo: null,
      });

      this.sendEmailVerification();
    } catch (error) {
      console.log("Error on setting new user", error);

      return error.message;
    } finally {
      this.setIsLoading(false);
    }
  };

  sendEmailVerification = async () => {
    try {
      const user = await firebase.auth().currentUser;

      user.sendEmailVerification();

      console.log("Email verification sent successfully.");
    } catch (error) {
      console.log("Error, email verification not sent.", error);

      return error.message;
    } finally {
      this.setIsLoading(false);
    }
  };

  handlePhotoUpload = async (photoToUpload) => {
    this.setIsLoading(true);
    try {
      const currentUid = this.uid;
      await firebase
        .storage()
        .ref(`userPhotos/${currentUid}/${photoToUpload.name}`)
        .put(photoToUpload);

      const url = await firebase
        .storage()
        .ref(`userPhotos/${currentUid}`)
        .child(photoToUpload.name)
        .getDownloadURL();

      await firebase.firestore().collection("users").doc(this.uid).update({
        photo: url,
      });
      console.log("Successfully updated photo URL.");
    } catch (error) {
      console.log("Error uploading photo.", error);

      return error.message;
    } finally {
      this.setIsLoading(false);
    }
  };

  handleNameUpdate = async (name, surname) => {
    this.setIsLoading(true);

    if (name !== "" || surname !== "") {
      try {
        await firebase.firestore().collection("users").doc(this.uid).update({
          name: name,
          surname: surname,
        });
      } catch (error) {
        console.log("Error on updating username", error);

        return error.message;
      } finally {
        this.setIsLoading(false);
      }
    }
  };

  updateProfile = async (
    cep,
    street,
    adressNumber,
    neighborhood,
    city,
    state,
    contactDDD,
    contactNumber
  ) => {
    try {
      await firebase.firestore().collection("users").doc(this.uid).update({
        cep: cep,
        street: street,
        adressNumber: adressNumber,
        neighborhood: neighborhood,
        city: city,
        state: state,
        contactDDD: contactDDD,
        contactNumber: contactNumber,
      });
    } catch (error) {
      console.log("Error on updating profile info.", error);

      return error.message;
    }
  };

  userDeleting = async () => {
    this.setIsLoading(true);
    const currentUser = await firebase.auth().currentUser;

    if (currentUser) {
      try {
        currentUser.delete();

        console.log("User successfully deleted.");
      } catch (error) {
        console.log("Error, user not deleted", error);

        return error.message;
      } finally {
        this.setIsLoading(false);
      }
    }
  };

  passwordReseting = async (password) => {
    this.setIsLoading(true);
    const currentUser = await firebase.auth().currentUser;

    if (currentUser) {
      try {
        currentUser.updatePassword(password);
      } catch (error) {
        console.log("Error, password not updated", error);

        return error.message;
      } finally {
        this.setIsLoading(false);
      }
    }
  };
}

export default UserStore;
