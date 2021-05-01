import Bar from "./Bar";
import { useEffect } from "react";
import SVG from "./SVG";
import { Route, Switch, useLocation } from "react-router";
import { Link } from "react-router-dom";
import Photos from "../pages/Photos/Photos";
import About from "../pages/About/About";
import Games from "../pages/Games/Games";
import PaintingList from "../pages/Paintings/PaintingList";
import Musings from "../pages/Musings/Musings";
import Coding from "../pages/Coding/Coding";
import Header from "../pages/Header/Header";
import Home from "../pages/Home/Home";
import Error404 from "./Error404";

const Body = ({ appRoutes }) => {
  const location = useLocation();

  let widthSVG = "300";
  let heightSVG = "300";
  let viewBoxSVG = "0 105 200 200";

  let query1 = window.matchMedia("(max-width: 507px)");
  let query2 = window.matchMedia("(max-width: 767px)");

  if (query1.matches) {
    widthSVG = "140";
    heightSVG = "140";
    viewBoxSVG = "0 105 200 200";
  } else if (query2.matches) {
    widthSVG = "200";
    heightSVG = "200";
    viewBoxSVG = "0 105 200 200";
  }

  function changeBackground() {
    let key = 3;
    let responsiveness = 1;

    if (query1.matches) {
      responsiveness = 5;
    }

    if (key === 0) {
      key = 0;
      document.body.style.setProperty("color", "white");
      document.body.style.setProperty("background-color", "rgb(214, 158, 5)");
    }

    let num = responsiveness * Math.ceil(Math.random() * key);

    if (query1.matches && key === 0) {
      num = 7;
    }

    function setBackgroundPosition(position) {
      document.body.style.setProperty("background-position", position);
    }

    function setSVGPosition(position) {
      var elem = document.getElementById("SVG");
      elem.style.left = position;
    }

    if (query1.matches) {
      setBackgroundPosition("center");
      setSVGPosition("50%");
    } else {
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

    document.body.background = "./assets/files/" + num + ".jpg";
  }

  useEffect(changeBackground, [location, query1.matches, query2.matches]);

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
      return <PaintingList />;
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
          <SVG width={widthSVG} height={heightSVG} viewBox={viewBoxSVG}></SVG>
        </Link>
      </div>
    </div>
  );
};

export default Body;
