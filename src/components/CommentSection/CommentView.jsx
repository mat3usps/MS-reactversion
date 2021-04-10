import Out from "../../assets/Utility/out.svg";
import firebase from "../firebaseConnection";

function CommentView({
  image,
  name,
  profile,
  children,
  pathname,
  selected,
  id,
}) {
  async function removeComment() {
    await firebase
      .firestore()
      .collection(`comments/${pathname}/${selected.path}`)
      .doc(id)
      .delete()
      .then(() => {
        console.log("Comentário excluido com sucesso.");
      })
      .catch((error) => {
        console.log("Erro ao tentar apagar comentário", error);
      });
  }

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
      <div className="remove-div">
        <button className="remove-button" onClick={removeComment}>
          <img src={Out} alt="Remove comment" />
        </button>
      </div>
    </div>
  );
}

export default CommentView;
