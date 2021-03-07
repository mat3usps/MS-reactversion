import Barbutton from "./Barbutton";

function Bar() {
  const menus = [
    { href: "./coding", title: "Coding" },
    { href: "./photos", title: "Photos" },
    { href: "./about", title: "About" },
    { href: "./games", title: "Games" },
    { href: "./paintings", title: "Paintings" },
    { href: "./musings", title: "Musings" },
  ];

  return (
    <div className="row buttonbar">
      {menus.map(({ href, title }) => (
        <Barbutton href={href} key={href}>
          {title}
        </Barbutton>
      ))}
    </div>
  );
}

export default Bar;
