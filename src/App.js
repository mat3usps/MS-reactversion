import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import Body from "./components/Body";
import Photos from "./components/Photos";
import About from "./components/About";

function App() {
  return (
    <div>
      <Body></Body>;
      <Route path="/About">
        <About />
      </Route>
      <Route path="/Photos">
        <Photos />
      </Route>
    </div>
  );
}

export default App;
