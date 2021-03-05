function Barbutton({ href, children }) {
  return (
    <div className="col-2">
      <a href={href}>
        <div className="btn-sp btn-three">
          <span>{children}</span>
        </div>
      </a>
    </div>
  );
}

export default Barbutton;
