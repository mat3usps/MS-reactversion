import React from "react";
import ReactDOM from "react-dom";
import "./assets/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import MainStore from "./store/MainStore";
import { MainStoreContext } from "./contexts/mainStoreContext";
const store = new MainStore();

ReactDOM.render(
  <BrowserRouter>
    <MainStoreContext.Provider value={{ ...store }}>
      <App />
    </MainStoreContext.Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
