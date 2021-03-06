import { observer } from "mobx-react";
import { useState } from "react";
import { useMainStoreContext } from "../../contexts/mainStoreContext";
import SecondaryInfo from "./SecondaryInfo";
import SignInPopup from "./SignInPopup";
import CartDisplay from "./CartDisplay";

const PaintingStore = observer(() => {
  const { userStore } = useMainStoreContext();
  const { loggedUser } = userStore;

  const [checkedInfo, setCheckedInfo] = useState(false);

  const proccedToPayment = () => {
    setCheckedInfo(true);
  };

  return (
    <div>
      {!checkedInfo ? (
        <div>
          <h3>Mateus' Store</h3>
          <br />
          <div className="cart">
            <div className="customer-info">
              <h6>Check your info</h6>
              <SecondaryInfo />
            </div>
            <div>
              <h6>This is your cart</h6>
              <CartDisplay />
            </div>
          </div>
          <br />
          <button
            type="button"
            className="modal-input-button"
            onClick={proccedToPayment}
          >
            Payment methods
          </button>
        </div>
      ) : loggedUser && loggedUser.isAnonymous ? (
        <div>
          <h3>To buy a painting you need to be signed.</h3>
          <br />
          <SignInPopup />
        </div>
      ) : (
        <div>
          <h3>Choose a payment method.</h3>
        </div>
      )}
    </div>
  );
});

export default PaintingStore;
