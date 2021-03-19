import Contactbutton from "./Contactbutton";
import Email from "./email.png";
import LinkedIn from "./linkedin.png";
import Github from "./github.png";
import Timer from "./Timer";

function About() {
  const buttons = [
    {
      name: "email",
      icon: Email,
      href: "mailto:mateusp.s@outlook.com",
    },
    {
      name: "Github",
      icon: Github,
      href: "https://github.com/mat3usps",
    },
    {
      name: "linkedIn",
      icon: LinkedIn,
      href: "https://www.linkedin.com/in/mateuspereiras/",
    },
  ];

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
        {buttons.map(({ name, icon, href }) => (
          <Contactbutton img={icon} href={href}>
            {name}
          </Contactbutton>
        ))}
      </div>
    </div>
  );
}

export default About;
