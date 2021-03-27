import Barbutton from "./Barbutton";

function Bar(props) {
  if (!props.paths) {
    return null;
  }

  return (
    <div className="row buttonbar">
      {props.paths.map(
        ({ hideButton, href, title }) =>
          !hideButton && (
            <Barbutton href={href} key={href}>
              {title}
            </Barbutton>
          )
      )}
    </div>
  );
}

export default Bar;
