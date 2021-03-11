import { Children } from "react";

function Musing(content) {
  return (
    <div className="musing">
      <h2>{Children}</h2>
      <p>{content}</p>
    </div>
  );
}
export default Musing;
