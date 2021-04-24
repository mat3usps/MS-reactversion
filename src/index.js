import React from "react";
import ReactDOM from "react-dom";
import "./assets/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import UserStore from "./store/UserStore";
import { UserStoreContext } from "./contexts/userStoreContext";

ReactDOM.render(
  <BrowserRouter>
    <UserStoreContext.Provider value={new UserStore()}>
      <App />
    </UserStoreContext.Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
