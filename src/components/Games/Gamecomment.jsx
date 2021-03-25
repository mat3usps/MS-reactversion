function Gamecomment({ image, name, profile, children }) {
  return (
    <div className="game-comment">
      <div>
        <img className="game-form-image" src={image} alt={name} />
      </div>
      <div className="game-comment-group">
        <h6>
          {name} - {profile}
        </h6>
        <p>{children}</p>
      </div>
    </div>
  );
}

export default Gamecomment;
