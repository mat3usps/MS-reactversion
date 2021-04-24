import { observer } from "mobx-react";
import { useState } from "react";
import { useUserStoreContext } from "../../contexts/userStoreContext";
import SecondaryInfo from "./SecondaryInfo";
import SignInPopup from "./SignInPopup";
import CartDisplay from "./CartDisplay";

const PaintingStore = observer(() => {
  const { loggedUser, userCart } = useUserStoreContext();

  const [checkedInfo, setCheckedInfo] = useState(false);

  const proccedToPayment = () => {
    setCheckedInfo(true);
  };

  return (
    <div>
      {loggedUser && loggedUser.isAnonymous ? (
        <div>
          <h3>To buy a painting you need to have a profile.</h3>
          <br />
          <SignInPopup />
        </div>
      ) : (
        <div>
          <h3>Mateus' Store</h3>
          <br />
          <div className="cart">
            <div className="customer-info">
              <h6>Check your info</h6>
              <SecondaryInfo />
            </div>
            <div className="cart-display">
              <CartDisplay />
            </div>
          </div>

          <button
            type="button"
            className="modal-input-button"
            onClick={proccedToPayment}
          >
            Payment methods
          </button>
        </div>
      )}
    </div>
  );
});

export default PaintingStore;
