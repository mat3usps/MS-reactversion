function Barbutton({ linkName, buttonTitle }) {
  return (
    <div className="col-2">
      <a href={linkName}>
        <div class="btn-sp btn-three">
          <span>{buttonTitle}</span>
        </div>
      </a>
    </div>
  );
}

function Bar() {
  return (
    <div className="row buttonbar">
      <Barbutton linkName="coding.html" buttonTitle="Coding"></Barbutton>
      <Barbutton linkName="photos.html" buttonTitle="Photos"></Barbutton>
      <Barbutton linkName="about.html" buttonTitle="About"></Barbutton>
      <Barbutton linkName="games.html" buttonTitle="Games"></Barbutton>
      <Barbutton linkName="paintings.html" buttonTitle="Paintings"></Barbutton>
      <Barbutton linkName="musings.html" buttonTitle="Musings"></Barbutton>
    </div>
  );
}

export default Bar;
