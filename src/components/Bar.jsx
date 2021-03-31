import Barbutton from "./Barbutton";

function Bar(props) {
  if (!props.paths) {
    return null;
  }

  return (
    <div className="row buttonbar">
      {props.paths
        .filter(({ displayOnMenu }) => displayOnMenu)
        .map(({ path, title }) => (
          <Barbutton href={path} key={path}>
            {title}
          </Barbutton>
        ))}
    </div>
  );
}

export default Bar;
