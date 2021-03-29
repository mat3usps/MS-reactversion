import firebase from "firebase/app";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyAlq_ZMadKbLX67UAyG-y4y9al_ZiU6xuE",
  authDomain: "mp-reactversion.firebaseapp.com",
  projectId: "mp-reactversion",
  storageBucket: "mp-reactversion.appspot.com",
  messagingSenderId: "205935936348",
  appId: "1:205935936348:web:2f842ac63356f74653b799",
};
// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
