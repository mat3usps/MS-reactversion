import Separator from "../../assets/Utility/bar.png";
import Thumbsup from "../../components/ThumbsUp";

function Musing({ content, children, userLogged }) {
  return (
    <div className="musing">
      <h2>{children}</h2>
      <p>{content}</p>
      <img className="separator" src={Separator} alt="Bar" />
      <Thumbsup userLogged={userLogged} page="musings" title={children} />
    </div>
  );
}
export default Musing;
