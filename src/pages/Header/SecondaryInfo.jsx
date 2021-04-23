import React, { useEffect, useState } from "react";
import axios from "axios";
import { observer } from "mobx-react";
import { useUserStoreContext } from "../../contexts/userStoreContext";

const SecondaryInfo = observer(() => {
  const { loggedUser, updateProfile } = useUserStoreContext();

  const [cep, setCEP] = useState(loggedUser && loggedUser.cep);
  const [firstTry, setFirstTry] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");

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
  const [contactDDD, setContactDDD] = useState(
    loggedUser && loggedUser.contactDDD
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
        console.log("Error on getting API data.", error);
      });
  };

  const numberFormatting = (number) => {
    if (number) {
      const rawNumber = number;
      const noHyphenNumber = rawNumber.replace(/-/g, "");

      const isCelphone = noHyphenNumber.length === 9;
      let formattedNumber;

      if (isCelphone) {
        const part1 = noHyphenNumber.slice(0, 1);
        const part2 = noHyphenNumber.slice(1, 5);
        const part3 = noHyphenNumber.slice(5, 9);
        formattedNumber = `${part1} ${part2}-${part3}`;
      } else {
        const part1 = noHyphenNumber.slice(0, 4);
        const part2 = noHyphenNumber.slice(4, 8);
        formattedNumber = `${part1}-${part2}`;
      }

      setContactNumber(formattedNumber);
    }
  };

  const dddFormatting = (ddd) => {
    const formattedDDD = `(${ddd})`;
    setContactDDD(formattedDDD);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    updateProfile(
      cep,
      street,
      adressNumber,
      neighborhood,
      city,
      state,
      contactDDD,
      contactNumber
    );
  };

  useEffect(() => {
    const cepValidating = (cep) => {
      if (cep !== null && !firstTry) {
        const pattern = /^\d{8}$/;
        const valid = pattern.test(cep);

        if (valid) {
          setAlertMessage("");
        } else {
          setAlertMessage("Use numbers only.");
        }
      }
    };
    cepValidating(cep);
  }, [cep, firstTry]);

  return (
    <div className="profile-secondary-info">
      <form onSubmit={handleUpdate}>
        <div className="CEP">
          <div>
            <label for="CEP">CEP: </label>
            <input
              value={cep}
              id="CEP"
              type="text"
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

          <p>{alertMessage}</p>
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
            type="text"
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
          <label for="contactNumber">Contact Number: </label>
          <input
            className="contactDDD"
            value={contactDDD}
            id="contactDDD"
            type="text"
            maxLength="2"
            placeholder={loggedUser.contactDDD}
            onChange={(e) => setContactDDD(e.target.value)}
            onBlur={() => dddFormatting(contactDDD)}
          />
          <input
            className="contactNumber"
            value={contactNumber}
            id="contactNumber"
            type="text"
            maxLength="9"
            placeholder={loggedUser.contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            onBlur={() => numberFormatting(contactNumber)}
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
