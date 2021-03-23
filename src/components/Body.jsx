import Bar from "./Bar";
import { useEffect } from "react";
import SVG from "./SVG";
import { Route, useLocation } from "react-router";
import { Link } from "react-router-dom";
import Photos from "./Photos/Photos";
import About from "./About/About";
import Games from "./Games/Games";
import Paintings from "./Paintings/Paintings";
import Musings from "./Musings/Musings";
import Coding from "./Coding/Coding";
import { useState } from "react/cjs/react.development";

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

  const renderMenuComponent = (title) => {
    if (title === "About") {
      return <About />;
    }
    if (title === "Coding") {
      return <Coding />;
    }
    if (title === "Games") {
      return <Games />;
    }
    if (title === "Musings") {
      return <Musings />;
    }
    if (title === "Paintings") {
      return <Paintings />;
    }
    if (title === "Photos") {
      return <Photos />;
    }

    return <h1>{title}</h1>;
  };

  return (
    <div>
      <div className="container">
        <Bar menus={menus}></Bar>
        {location.pathname === "/" && (
          <div className="row secretBG-row">
            <button className="secretBG-button" onClick={setSecretBG}></button>
          </div>
        )}
        {menus.map(({ href, title }) => (
          <Route path={href} key={title}>
            {renderMenuComponent(title)}
          </Route>
        ))}
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
