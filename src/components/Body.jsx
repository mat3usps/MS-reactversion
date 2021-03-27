import Bar from "./Bar";
import { useEffect } from "react";
import SVG from "./SVG";
import { Route, Switch, useLocation } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import Photos from "./Photos/Photos";
import About from "./About/About";
import Games from "./Games/Games";
import Paintings from "./Paintings/Paintings";
import Musings from "./Musings/Musings";
import Coding from "./Coding/Coding";
import { useState } from "react/cjs/react.development";
import Header from "./Header";
import Error404 from "./Error404";

function Body() {
  const location = useLocation();

  const [secretBG, showSecretBG] = useState(false);
  const setSecretBG = () => {
    showSecretBG(true);
  };

  function changeBackground() {
    let key = 3;
    if (secretBG) {
      key = 0;
      document.body.style.setProperty("color", "white");
      document.body.style.setProperty("background-color", "rgb(214, 158, 5)");
    }
    const num = Math.ceil(Math.random() * key);

    function setBackgroundPosition(position) {
      document.body.style.setProperty("background-position", position);
    }

    function setSVGPosition(position) {
      var elem = document.getElementById("SVG");
      elem.style.left = position;
    }

    document.body.background = "./assets/files/" + num + ".jpg";
    if (["/paintings", "/"].includes(location.pathname)) {
      setBackgroundPosition("center");
      setSVGPosition("51%");
    } else if (location.pathname === "/musings") {
      setBackgroundPosition("right");
      setSVGPosition("38.5%");
    } else {
      setBackgroundPosition("left");
      setSVGPosition("65%");
    }
  }

  useEffect(changeBackground, [location, secretBG]);

  const menus = [
    { href: "/about", title: "About" },
    { href: "/coding", title: "Coding" },
    { href: "/games", title: "Games" },
    { href: "/musings", title: "Musings" },
    { href: "/paintings", title: "Paintings" },
    { href: "/photos", title: "Photos" },
  ];

  return (
    <div>
      <div className="container">
        <BrowserRouter>
          <Header />
          <Bar menus={menus}></Bar>
          {location.pathname === "/" && (
            <div className="row secretBG-row">
              <button
                className="secretBG-button"
                onClick={setSecretBG}
              ></button>
            </div>
          )}
          <Switch>
            <Route exact path="/" component={""} />
            <Route path="/about" component={About} />
            <Route path="/coding" component={Coding} />
            <Route path="/games" component={Games} />
            <Route path="/musings" component={Musings} />
            <Route path="/paintings" component={Paintings} />
            <Route path="/photos" component={Photos} />
            <Route path="*" component={Error404} />
          </Switch>
        </BrowserRouter>
      </div>
      <div className="loader-wrapper">
        <Link to="/">
          <SVG></SVG>
        </Link>
      </div>
    </div>
  );
}

export default Body;
