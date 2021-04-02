import Separator from "../../assets/Utility/bar.png";
import Thumbsup from "../Thumbsup/Thumbsup";

function Musing({ content, children, didUpdateLikes }) {
  return (
    <div className="musing">
      <h2>{children}</h2>
      <p>{content}</p>
      <img className="separator" src={Separator} alt="Bar" />
      <Thumbsup didUpdateLikes={didUpdateLikes} />
    </div>
  );
}
export default Musing;
