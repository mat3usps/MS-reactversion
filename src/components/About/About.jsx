import Contactbutton from "./Contactbutton";
import Timer from "./Timer";
import { useState, useEffect } from "react";
import axios from "axios";

function About() {
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    axios
      .get(`https://mp-reactversion-default-rtdb.firebaseio.com/about.json`)
      .then((response) => {
        const buttons = Object.values(response.data);
        setButtons(buttons);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [buttons]);

  return (
    <div className="abouttext">
      <p>
        You probably know my name, but certainly you know very little (if none)
        of my{" "}
        <strong>{<Timer callQueuedTime="1994-09-14T16:43:00"></Timer>}</strong>{" "}
        seconds long history. <br /> If that is the case...
      </p>
      <h2>A life story told in titles</h2>
      <p>
        Clouds observer, shower singer, porch painter, rave rat, pseudo-virgo,
        gaymer, water bender, ex-paralover, justdancer &amp; kpopper, rented car
        driver, unebiano, non-extremist communist, buddypoke &amp; bitmoji user,
        photo-addicted, e-sports spectator, nihilist by choice, spare time
        naturalist, generation-Y member, and cajazeirense.
      </p>
      <h3>You can reach me at:</h3>
      <div className="contactbar">
        {buttons.length !== 0 &&
          buttons.map(({ name, icon, href }) => (
            <Contactbutton img={icon} href={href}>
              {name}
            </Contactbutton>
          ))}
      </div>
    </div>
  );
}

export default About;
