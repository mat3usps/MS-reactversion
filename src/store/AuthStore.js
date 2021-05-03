import { makeObservable, observable, action } from "mobx";
import firebase from "../components/firebaseConnection";
import "firebase/auth";
import UserStore from "./UserStore";

class AuthStore {
  isLoading = false;

  constructor() {
    this.userStore = new UserStore();
    makeObservable(this, {
      isLoading: observable,
      setIsLoading: action,
    });
  }

  setIsLoading = (value) => {
    this.isLoading = value;
  };

  authenticateUser = async (email, password, name, surname) => {
    this.setIsLoading(true);
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );

    const auth = firebase.auth();

    try {
      const { user } = await auth.currentUser.linkWithCredential(credential);

      const uid = user.uid;

      if (user.isAnonymous === false) {
        this.userStore.setLoggedUser(user);
        this.storingNewUser(uid, name, surname);
      }
    } catch (error) {
      console.log("Error on linking credentials", error);

      return error.message;
    } finally {
      this.setIsLoading(false);
    }
  };

  storingNewUser = async (uid, name, surname) => {
    this.setIsLoading(true);

    try {
      await firebase.firestore().collection("users").doc(uid).update({
        name: name,
        surname: surname,
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
    this.setIsLoading(true);

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

  signIn = async (email, password) => {
    this.setIsLoading(true);

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("User, didn't login.", error);

      return error.message;
    } finally {
      this.setIsLoading(false);
    }
  };

  handlePhotoUpload = async (photoToUpload) => {
    this.setIsLoading(true);

    try {
      const currentUid = this.userStore.uid;
      await firebase
        .storage()
        .ref(`userPhotos/${currentUid}/${photoToUpload.name}`)
        .put(photoToUpload);

      const url = await firebase
        .storage()
        .ref(`userPhotos/${currentUid}`)
        .child(photoToUpload.name)
        .getDownloadURL();

      await firebase
        .firestore()
        .collection("users")
        .doc(this.userStore.uid)
        .update({
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
        await firebase
          .firestore()
          .collection("users")
          .doc(this.userStore.uid)
          .update({
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
    this.setIsLoading(true);

    if (!cep) {
      cep = "";
    }
    if (!street) {
      street = "";
    }
    if (!adressNumber) {
      adressNumber = "";
    }
    if (!neighborhood) {
      neighborhood = "";
    }
    if (!city) {
      city = "";
    }
    if (!state) {
      state = "";
    }
    if (!contactDDD) {
      contactDDD = "";
    }
    if (!contactNumber) {
      contactNumber = "";
    }

    try {
      await firebase
        .firestore()
        .collection("users")
        .doc(this.userStore.uid)
        .update({
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
    } finally {
      this.setIsLoading(false);
    }
  };

  userDeleting = async () => {
    this.setIsLoading(true);

    const currentUser = await firebase.auth().currentUser;

    if (currentUser) {
      try {
        await currentUser.delete();

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
        await currentUser.updatePassword(password);
      } catch (error) {
        console.log("Error, password not updated", error);

        return error.message;
      } finally {
        this.setIsLoading(false);
      }
    }
  };
}

export default AuthStore;
