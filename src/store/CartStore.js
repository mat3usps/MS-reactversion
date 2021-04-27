import { makeObservable, observable, action, computed } from "mobx";
import firebase from "../components/firebaseConnection";
import UserStore from "./UserStore";

class CartStore {
  store = false;
  userCart = [];

  constructor() {
    this.userStore = new UserStore();
    makeObservable(this, {
      store: observable,
      userCart: observable,
      setStore: action,
      setUserCart: action,
      totalPrice: computed,
    });
    this.refreshCart();
  }

  setStore = (value) => {
    this.store = value;
  };

  setUserCart = (value) => {
    this.userCart = value;
  };

  refreshCart = async () => {
    if (this.userStore.loggedUser) {
      try {
        const { cart } = await firebase
          .firestore()
          .collection("users")
          .doc(this.userStore.uid)
          .get();

        this.setUserCart(cart);
      } catch (error) {
        console.log("Coundn't refresh cart.", error);
      } finally {
        this.refreshCart();
      }
    }
  };

  addToCart = async (item) => {
    let currentCart = [];
    currentCart = [...this.userCart, item];

    try {
      await firebase
        .firestore()
        .collection("users")
        .doc(this.userStore.uid)
        .update({
          cart: currentCart,
        });
    } catch (error) {
      console.log("Coundn't add to cart.", error);
    } finally {
      this.refreshCart();
    }
  };

  removeFromCart = async (name) => {
    const currentCart = this.userCart;
    const itemRemoved = currentCart.filter((object) => {
      return object.name !== name;
    });

    try {
      await firebase
        .firestore()
        .collection("users")
        .doc(this.userStore.uid)
        .update({
          cart: itemRemoved,
        });
    } catch (error) {
      console.log("Coundn't remove from cart.", error);
    }
  };

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
}

export default CartStore;
