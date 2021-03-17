import Separator from "./bar.png";

function Musing({ content, children }) {
  return (
    <div className="musing">
      <h2>{children}</h2>
      <p>{content}</p>
      <img className="separator" src={Separator} alt="Bar" />
    </div>
  );
}
export default Musing;
