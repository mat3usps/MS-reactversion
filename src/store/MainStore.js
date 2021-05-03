import UserStore from "./UserStore";
import AuthStore from "./AuthStore";
import CartStore from "./CartStore";

class MainStore {
  constructor() {
    this.cartStore = new CartStore(this);
    this.authStore = new AuthStore(this);
    this.userStore = new UserStore(this);
  }
}

export default MainStore;
