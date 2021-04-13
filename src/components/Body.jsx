import Bar from "./Bar";
import { useEffect } from "react";
import SVG from "./SVG";
import { Route, Switch, useLocation } from "react-router";
import { Link } from "react-router-dom";
import Photos from "../pages/Photos/Photos";
import About from "../pages/About/About";
import Games from "../pages/Games/Games";
import Paintings from "../pages/Paintings/Paintings";
import Musings from "../pages/Musings/Musings";
import Coding from "../pages/Coding/Coding";
import Header from "../pages/Header/Header";
import Home from "../pages/Home/Home";
import Error404 from "./Error404";

function Body({ appRoutes }) {
  const location = useLocation();

  function changeBackground() {
    let key = 3;
    if (key === 0) {
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

  useEffect(changeBackground, [location]);

  const renderMenuComponent = (title) => {
    if (title === "Home") {
      return <Home />;
    } else if (title === "About") {
      return <About />;
    } else if (title === "Coding") {
      return <Coding />;
    } else if (title === "Games") {
      return <Games />;
    } else if (title === "Musings") {
      return <Musings />;
    } else if (title === "Paintings") {
      return <Paintings />;
    } else if (title === "Photos") {
      return <Photos />;
    }
    return <Error404 />;
  };

  return (
    <div>
      <div className="container">
        <Header />
        <Bar paths={appRoutes}></Bar>
        <Switch>
          {appRoutes.map(({ isExact, path, title }) => (
            <Route exact={isExact} path={path} key={title}>
              {renderMenuComponent(title)}
            </Route>
          ))}
        </Switch>
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
