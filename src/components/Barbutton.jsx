function Barbutton({ linkName, buttonTitle }) {
  return (
    <div class="col-2">
      <a href={linkName}>
        <div class="btn-sp btn-three">
          <span>{buttonTitle}</span>
        </div>
      </a>
    </div>
  );
}

export default Barbutton;
