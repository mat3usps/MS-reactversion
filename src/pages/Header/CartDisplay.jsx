import { observer } from "mobx-react";
import { useMainStoreContext } from "../../contexts/mainStoreContext";
import Remove from "../../assets/Utility/removecart.svg";

const CartDisplay = observer(() => {
  const { cartStore } = useMainStoreContext();
  const { userCart, removeFromCart } = cartStore;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="cart-display">
      {userCart.map(({ name, price, image, description }) => (
        <div className="cart-item" key={name}>
          <button onClick={() => removeFromCart(name)}>
            <img src={Remove} alt="remove from cart" />
          </button>
          <img src={image} alt={name} />
          <div>
            <h5>"{name}"</h5>
            <h6>{formatter.format(price)}</h6>
            <p>{description}</p>
          </div>
        </div>
      ))}
    </div>
  );
});

export default CartDisplay;
