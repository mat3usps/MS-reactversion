import { useState } from "react";
import LoadingSVG from "../../components/LoadingSVG";
import { observer } from "mobx-react";
import { useUserStoreContext } from "../../contexts/userStoreContext";

const SignInPopUp = observer(() => {
  const { authenticateUser, isLoading, setIsLoading } = useUserStoreContext();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validationMessage, setValidationMessage] = useState("");
  const [firstTry, setFirstTry] = useState(true);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  function displayConfirmationMessage(message) {
    setConfirmationMessage(message);
    setInterval(() => {
      setConfirmationMessage("");
    }, 5000);
  }

  const emailValidation = (event, firstTry) => {
    setEmail(event.target.value);

    if (!firstTry) {
      const pattern = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
      const valid = pattern.test(event.target.value);

      if (valid) {
        setValidationMessage("");
      } else {
        setValidationMessage("This is not a valid email.");
      }
    }
  };

  const passwordValidation = (event, firstTry) => {
    setPassword(event.target.value);

    if (!firstTry) {
      const pattern = /^[\w@-]{8,20}$/;
      const valid = pattern.test(event.target.value);

      if (valid) {
        setValidationMessage("");
      } else {
        setValidationMessage("This is not a valid password.");
      }
    }
  };

  const userDidAuthenticate = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setFirstTry(false);
    const error = authenticateUser(email, password, name, surname);
    if (error) {
      displayConfirmationMessage(error);
    }
  };

  return (
    <div className="login-popup">
      {!isLoading ? (
        <form>
          <div>
            <div className="name-input-group">
              <label for="Name" className="nodisplay">
                Name:
              </label>
              <input
                className="modal-input"
                id="Name"
                type="text"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="name-input-group">
              <label for="Surname" className="nodisplay">
                Surname:
              </label>
              <input
                className="modal-input"
                id="Surname"
                type="text"
                value={surname}
                placeholder="Surname"
                onChange={(e) => setSurname(e.target.value)}
              ></input>
            </div>
          </div>
          <label for="Email" className="nodisplay">
            Email:{" "}
          </label>
          <input
            className="modal-input"
            value={email}
            id="Email"
            type="text"
            placeholder="Email"
            onChange={(event) => emailValidation(event, firstTry)}
          />
          <br />
          <label for="Password" className="nodisplay">
            Password:{" "}
          </label>
          <input
            className="modal-input"
            id="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => passwordValidation(event, firstTry)}
          ></input>
          <p className="input-error">{validationMessage}</p>
          <p className="input-error">{confirmationMessage}</p>
          <div>
            <div className="login-button-div">
              <button
                type="submit"
                className="modal-input-button"
                onClick={userDidAuthenticate}
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
      ) : (
        <LoadingSVG />
      )}
    </div>
  );
});

export default SignInPopUp;
