function Painting(image, children, description, price) {
  return (
    <div className="painting">
      <div className="frame">
        <img src={image} alt={children} />
      </div>
      <div className="frameInfo">
        <h2>{children}</h2>
        <p>{description}</p>
        <h3>&dollar; {price}</h3>
      </div>
    </div>
  );
}

export default Painting;
