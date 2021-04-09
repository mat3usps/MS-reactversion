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
import { useState } from "react/cjs/react.development";
import Header from "../pages/Header/Header";
import Home from "../pages/Home/Home";
import Error404 from "./Error404";
import firebase from "./firebaseConnection";
import "firebase/auth";

function Body({ appRoutes }) {
  const location = useLocation();

  const [userLogged, setUserLogged] = useState(null);

  async function checkLogin() {
    await firebase.auth().onAuthStateChanged(async (value) => {
      let user = value;
      if (value) {
        try {
          const snapshot = await firebase
            .firestore()
            .collection("users")
            .doc(value.uid)
            .get();

          user = {
            ...value,
            ...snapshot.data(),
          };
        } catch (error) {
          console.error("onAuthStateChanged", error);
        }
      }
      setUserLogged(user);
    });
  }

  checkLogin();

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
      return <Home userLogged={userLogged} vipLogin={""} />;
    } else if (title === "About") {
      return <About userLogged={userLogged} />;
    } else if (title === "Coding") {
      return <Coding userLogged={userLogged} />;
    } else if (title === "Games") {
      return <Games userLogged={userLogged} />;
    } else if (title === "Musings") {
      return <Musings userLogged={userLogged} />;
    } else if (title === "Paintings") {
      return <Paintings userLogged={userLogged} />;
    } else if (title === "Photos") {
      return <Photos userLogged={userLogged} />;
    }
    return <Error404 userLogged={userLogged} />;
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
