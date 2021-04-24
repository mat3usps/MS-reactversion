import { observer } from "mobx-react";
import { useUserStoreContext } from "../../contexts/userStoreContext";
import remove from "../../assets/Utility/removecart.svg";

const CartDisplay = observer(({}) => {
  const { userCart } = useUserStoreContext();

  return (
    <div className="cart-display">
      {userCart.map((name, price, image, description) => {
        <div className="cart-item" key={name}>
          <button>
            <img src={remove} alt="remove from cart" />
          </button>
          <img src={image} alt={name} />
          <div className="cart-item-info">
            <h5>Painting - {name}</h5>
            <h6>{price}</h6>
            <p>{description}</p>
          </div>
        </div>;
      })}
    </div>
  );
});

export default CartDisplay;
