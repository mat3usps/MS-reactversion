import { observer } from "mobx-react";
import { useState } from "react";
import { useUserStoreContext } from "../../contexts/userStoreContext";
import SecondaryInfo from "../Header/SecondaryInfo";
import SignInPopup from "../Header/SignInPopup";

const PaintingStore = observer(() => {
  const { loggedUser } = useUserStoreContext();

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
          <h3>Check and update your info.</h3>
          <br />
          <SecondaryInfo />
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
