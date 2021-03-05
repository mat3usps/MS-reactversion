import Bar from "./Bar";
import { useEffect } from "react";

function Body() {
  function ChangeIt() {
    const num = Math.ceil(Math.random() * 3);
    document.body.background = "./assets/files/" + num + ".jpg";
  }

  {
    /* -Temporizador (tempo em msContentScript no 2 parametro)
    function ChangeIt() {
    setInterval(() => {
      const num = Math.ceil(Math.random() * 3);
      document.body.background = "./assets/files/" + num + ".jpg";
    }, 60000);
  */
  }

  useEffect(ChangeIt, []);

  return (
    <div>
      <div className="container">
        <Bar></Bar>
      </div>
      <div className="loader-wrapper">
        <a href="../index.html">
          <div className="animated-svg"></div>
        </a>
      </div>
    </div>
  );
}

export default Body;
