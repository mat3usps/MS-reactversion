import React from "react";
import { Link } from "react-router-dom";

function Barbutton({ href, children }) {
  return (
    <div className="col-2">
      <Link to={href} style={{ textDecoration: "none" }}>
        <div className="btn-sp btn-three">
          <span>{children}</span>
        </div>
      </Link>
    </div>
  );
}

export default Barbutton;
