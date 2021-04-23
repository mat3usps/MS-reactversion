import { makeObservable, observable, action, computed, reaction } from "mobx";
import firebase from "../components/firebaseConnection";
import "firebase/auth";

class UserStore {
  loggedUser = null;
  isLoading = false;
  userCart = [];

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
      async (uid) => {
        console.log("uid", uid);
        if (uid) {
          const authUser = this.loggedUser;

          await firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .onSnapshot((userData) => {
              let user = {};

              user = {
                ...authUser,
                ...userData,
              };

              this.setLoggedUser(user);
            });
        } else {
          console.log("sem uid");
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

  addToCart = (item) => {
    this.userCart.push({
      ...item,
    });
  };

  get uid() {
    if (this.loggedUser) {
      return this.loggedUser.uid;
    }
    return null;
  }

  get totalPrice() {
    if (this.userCart.length !== 0) {
      let amount = 0;
      this.userCart.forEach((item) => {
        amount += item.price;
      });
      return amount;
    }
    return null;
  }

  async checkLogin() {
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
  }

  async signIn(email, password) {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setIsLoading(false);
      })
      .catch((error) => {
        console.log("User, did login.", error);
        this.setIsLoading(false);
        return error.message;
      });
  }

  authenticateUser = (email, password, name, surname) => {
    this.setIsLoading(true);
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );

    const auth = firebase.auth();

    auth.currentUser
      .linkWithCredential(credential)
      .then(({ user }) => {
        const uid = user.uid;
        this.setLoggedUser(user);
        this.storingNewUser(uid, name, surname);
      })
      .catch((error) => {
        console.log("Error on linking credentials", error);
        this.setIsLoading(false);
        return error.message;
      });
  };

  async storingNewUser(uid, name, surname) {
    await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .set({
        name: name,
        surname: surname,
        photo: null,
      })
      .then(() => {
        this.sendEmailVerification();
      })
      .catch((error) => {
        console.log("Error on setting new user", error);
        this.setIsLoading(false);
        return error.message;
      });
  }

  async sendEmailVerification() {
    const user = await firebase.auth().currentUser;
    user
      .sendEmailVerification()
      .then(() => {
        console.log("Email verification sent successfully.");
        this.setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error, email verification not sent.", error);
        this.setIsLoading(false);

        return error.message;
      });
  }

  async handlePhotoUpload(photoToUpload) {
    this.setIsLoading(true);
    const currentUid = this.uid;
    await firebase
      .storage()
      .ref(`userPhotos/${currentUid}/${photoToUpload.name}`)
      .put(photoToUpload)
      .then(async () => {
        await firebase
          .storage()
          .ref(`userPhotos/${currentUid}`)
          .child(photoToUpload.name)
          .getDownloadURL()
          .then(async (url) => {
            await firebase
              .firestore()
              .collection("users")
              .doc(this.uid)
              .update({
                photo: url,
              })
              .then(() => {
                this.setIsLoading(false);
                console.log("Successfully updated photo URL.");
              })
              .catch((error) => {
                this.setIsLoading(false);
                console.log("Error on updating photo URL.", error);
              });
          })
          .catch((error) => {
            this.setIsLoading(false);
            console.log("Error on getting photo URL.", error);
          });
      })
      .catch((error) => {
        this.setIsLoading(false);
        console.log("Error on storing photo.", error);
      });
  }

  async handleNameUpdate(name, surname) {
    this.setIsLoading(true);

    if (name !== "" || surname !== "") {
      await firebase
        .firestore()
        .collection("users")
        .doc(this.uid)
        .update({
          name: name,
          surname: surname,
        })
        .then(() => {
          console.log("Username successfully updated.");
          this.setIsLoading(false);
        })
        .catch((error) => {
          this.setIsLoading(false);
          console.log("Error on updating username", error);
        });
    }
  }

  async updateProfile(
    cep,
    street,
    adressNumber,
    neighborhood,
    city,
    state,
    contactDDD,
    contactNumber
  ) {
    await firebase
      .firestore()
      .collection("users")
      .doc(this.uid)
      .update({
        cep: cep,
        street: street,
        adressNumber: adressNumber,
        neighborhood: neighborhood,
        city: city,
        state: state,
        contactDDD: contactDDD,
        contactNumber: contactNumber,
      })
      .then(() => {
        console.log("Successfully updated.");
      })
      .catch((error) => {
        console.log("Error on updating profile info.", error);
      });
  }

  async userDeleting() {
    this.setIsLoading(true);
    const currentUser = await firebase.auth().currentUser;

    if (currentUser) {
      currentUser
        .delete()
        .then(() => {
          console.log("User successfully deleted.");
          this.setIsLoading(false);
        })
        .catch((error) => {
          console.log("Error, user not deleted", error);
          this.setIsLoading(false);
        });
    }
  }
}

export default UserStore;
