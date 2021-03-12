import Bar from "./Bar";
import { useEffect } from "react";
import SVG from "./SVG";
import { Route, useLocation } from "react-router";
import Photos from "./Photos";
import About from "./About";
import Games from "./Games";
import Paintings from "./Paintings";
import Musings from "./Musings";
import Coding from "./Coding";

function Body() {
  const location = useLocation();

  function ChangeBackground() {
    const num = Math.ceil(Math.random() * 3);

    document.body.background = "./assets/files/" + num + ".jpg";
    if (location.pathname === "/paintings" || "/") {
      document.body.style.setProperty("--background-position", "center");
    } else if (location.pathname === "/about" || "/games" || "/coding") {
      document.body.style.setProperty("--background-position", "right");
    } else {
      document.body.style.setProperty("--background-position", "left");
    }
  }

  {
    /* -Temporizador (tempo em msContentScript no 2 parametro)
    function ChangeBackground() {
    setInterval(() => {
      const num = Math.ceil(Math.random() * 3);
      document.body.background = "./assets/files/" + num + ".jpg";
    }, 60000);
  */
  }

  useEffect(ChangeBackground, [location]);

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
        {menus.map(({ href, title }) => (
          <Route path={href}>{renderMenuComponent(title)}</Route>
        ))}
      </div>
      <div className="loader-wrapper">
        <a href="../index.html">
          <SVG></SVG>
        </a>
      </div>
    </div>
  );
}

export default Body;
