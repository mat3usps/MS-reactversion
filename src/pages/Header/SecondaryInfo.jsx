import React, { useEffect, useState } from "react";
import axios from "axios";
import firebase from "../../components/firebaseConnection";
import { observer } from "mobx-react";
import { useUserStoreContext } from "../../contexts/userStoreContext";

const SecondaryInfo = observer(({ IsLoading }) => {
  const { loggedUser, setLoggedUser, storageUser } = useUserStoreContext();

  const [cep, setCEP] = useState(loggedUser && loggedUser.cep);
  const [firstTry, setFirstTry] = useState(true);
  const [cepValidation, setCEPValidation] = useState("");

  const [state, setState] = useState(loggedUser && loggedUser.state);
  const [city, setCity] = useState(loggedUser && loggedUser.city);
  const [neighborhood, setNeighborhood] = useState(
    loggedUser && loggedUser.neighborhood
  );
  const [street, setStreet] = useState(loggedUser && loggedUser.street);
  const [adressNumber, setAdressNumber] = useState(
    loggedUser && loggedUser.adressNumber
  );

  const [contactNumber, setContactNumber] = useState(
    loggedUser && loggedUser.contactNumber
  );

  const searchCEP = (event) => {
    event.preventDefault();
    setFirstTry(false);

    axios
      .get(`https://brasilapi.com.br/api/cep/v1/${cep}`)
      .then((response) => {
        let data = {};

        data = {
          ...response,
        };

        setState(data.data.state);
        setCity(data.data.city);
        setNeighborhood(data.data.neighborhood);
        setStreet(data.data.street);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const cepValidating = (cep) => {
    if (cep !== null && !firstTry) {
      const pattern = /^\d{8}$/;
      const valid = pattern.test(cep);

      if (valid) {
        setCEPValidation("");
      } else {
        setCEPValidation("Use 8 numbers only.");
      }
    }
  };

  async function updateProfile(
    cep,
    street,
    adressNumber,
    neighborhood,
    city,
    state
  ) {
    await firebase
      .firestore()
      .collection("users")
      .doc(loggedUser.uid)
      .update({
        cep: cep,
        street: street,
        adressNumber: adressNumber,
        neighborhood: neighborhood,
        city: city,
        state: state,
      })
      .then(() => {
        let data = {
          ...loggedUser,
          cep: cep,
          street: street,
          adressNumber: adressNumber,
          neighborhood: neighborhood,
          city: city,
          state: state,
        };

        IsLoading(false);
        setLoggedUser(data);
        storageUser(data);
      })
      .catch((error) => {
        IsLoading(false);
        console.log(error);
      });
  }

  const handleUpdate = (event) => {
    event.preventDefault();
    updateProfile(cep, street, adressNumber, neighborhood, city, state);
  };

  useEffect(() => {
    cepValidating(cep);
  }, [cep]);

  return (
    <div className="profile-secondary-info">
      <form onSubmit={handleUpdate}>
        <div className="CEP">
          <div>
            <label for="CEP">CEP: </label>
            <input
              value={cep}
              id="CEP"
              type="number"
              placeholder={loggedUser.cep}
              maxLength="9"
              onChange={(e) => setCEP(e.target.value)}
            />
            <button
              type="button"
              className="modal-input-button"
              onClick={searchCEP}
            >
              Search
            </button>
          </div>

          <p>{cepValidation}</p>
        </div>

        <div className="profile-input-group">
          <label for="street">Street: </label>
          <input
            className="street"
            value={street}
            id="street"
            type="text"
            placeholder={loggedUser.street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>

        <div className="profile-input-group">
          <label for="adressNumber">Number: </label>
          <input
            className="adress-number"
            value={adressNumber}
            id="adressNumber"
            type="number"
            maxLength="5"
            placeholder={loggedUser.adressNumber}
            onChange={(e) => setAdressNumber(e.target.value)}
          />

          <label for="neighborhood">Neighborhood: </label>
          <input
            className="neighborhood"
            value={neighborhood}
            id="neighborhood"
            type="text"
            placeholder={loggedUser.neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
          />
        </div>

        <div className="profile-input-group">
          <label for="city">City: </label>
          <input
            className="city"
            value={city}
            id="city"
            type="text"
            placeholder={loggedUser.city}
            onChange={(e) => setCity(e.target.value)}
          />

          <label for="state">State: </label>
          <input
            className="state"
            value={state}
            id="state"
            type="text"
            placeholder={loggedUser.state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>

        <br />

        <div className="profile-input-group">
          <label for="contactNumber">Contact: </label>
          <input
            className="contactNumber"
            value={contactNumber}
            id="contactNumber"
            type="number"
            placeholder={loggedUser.contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </div>

        <br />

        <button className="modal-input-button" type="submit">
          Update
        </button>
      </form>
    </div>
  );
});

export default SecondaryInfo;
