import Barbutton from "./Barbutton";

function Bar(props) {
  if (!props.menus) {
    return null;
  }

  return (
    <div className="row buttonbar">
      {props.menus.map(({ href, title }) => (
        <Barbutton href={href} key={href}>
          {title}
        </Barbutton>
      ))}
    </div>
  );
}

export default Bar;
