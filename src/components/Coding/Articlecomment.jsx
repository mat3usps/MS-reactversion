function Articlecomment({ image, name, profile, children }) {
  return (
    <div className="form-comment">
      <div>
        <img className="form-image" src={image} alt={name} />
      </div>
      <div className="form-comment-group">
        <h6>
          {name} - {profile}
        </h6>
        <p>{children}</p>
      </div>
    </div>
  );
}

export default Articlecomment;
