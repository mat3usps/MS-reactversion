import Bar from "./Bar";
import { useEffect } from "react";
import SVG from "./SVG";
import { Route, Switch, useLocation } from "react-router";
import { Link } from "react-router-dom";
import Photos from "./Photos/Photos";
import About from "./About/About";
import Games from "./Games/Games";
import Paintings from "./Paintings/Paintings";
import Musings from "./Musings/Musings";
import Coding from "./Coding/Coding";
import { useState } from "react/cjs/react.development";
import Header from "./Header/Header";
import Home from "./Home/Home";
import Error404 from "./Error404";
import firebase from "./firebaseConnection";
import "firebase/auth";

function Body({ appRoutes }) {
  const location = useLocation();

  const [userLogged, setUserLogged] = useState(false);

  async function checkLogin() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserLogged(true);
      } else {
        setUserLogged(false);
      }
    });
  }

  function changeBackground() {
    let key = 3;
    if (userLogged) {
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

  useEffect(changeBackground, [location, userLogged]);

  const renderMenuComponent = (title) => {
    if (title === "Home") {
      return <Home userLogged={userLogged} vipLogin={""} />;
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
        <Header userLogged={userLogged} />
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
