import Separator from "../../assets/Utility/bar.png";
import Thumbsup from "../Thumbsup";

function Musing({ content, children }) {
  return (
    <div className="musing">
      <h2>{children}</h2>
      <p>{content}</p>
      <img className="separator" src={Separator} alt="Bar" />
      <Thumbsup />
    </div>
  );
}
export default Musing;
