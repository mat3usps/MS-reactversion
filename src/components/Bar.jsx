import BarButton from "./BarButton";

function Bar(props) {
  if (!props.paths) {
    return null;
  }

  return (
    <div className="row buttonbar">
      {props.paths
        .filter(({ displayOnMenu }) => displayOnMenu)
        .map(({ path, title }) => (
          <BarButton href={path} key={path}>
            {title}
          </BarButton>
        ))}
    </div>
  );
}

export default Bar;
