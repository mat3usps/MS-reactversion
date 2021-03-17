import Contactbutton from "./Contactbutton";
import Email from "./email.png";
import LinkedIn from "./linkedin.png";
import Github from "./github.png";

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
      <h1>A life story told in titles</h1>
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
