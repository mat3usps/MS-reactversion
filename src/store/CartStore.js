import { makeObservable, observable, action, computed } from "mobx";

class CartStore {
  store = false;
  userCart = [
    { name: "Painting", price: 500.0, description: "Painting", image: "" },
  ];

  constructor() {
    makeObservable(this, {
      store: observable,
      userCart: observable,
      setStore: action,
      setUserCart: action,
      addToCart: action,
      removeFromCart: action,
      totalPrice: computed,
    });
  }

  setStore = (value) => {
    this.store = value;
  };

  setUserCart = (value) => {
    this.userCart = value;
  };

  addToCart = (item) => {
    this.userCart.push(item);
  };

  removeFromCart = (name) => {
    const itemRemoved = this.userCart.filter((object) => {
      return object.name !== name;
    });
    this.setUserCart(itemRemoved);
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
