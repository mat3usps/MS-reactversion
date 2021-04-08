import React from "react";
import { Link } from "react-router-dom";

function Barbutton({ href, children, onClick, dontPrevent }) {
  if (!href && !onClick) {
    return null;
  }

  const clickEvent = dontPrevent
    ? () => onClick()
    : (event) => {
        event.preventDefault();
        onClick();
      };

  const renderChildren = (
    <div className="btn-sp btn-three">
      <span>{children}</span>
    </div>
  );

  return (
    <div className="col">
      {href ? (
        <Link to={href} style={{ textDecoration: "none" }}>
          {renderChildren}
        </Link>
      ) : (
        <button type="button" className="clean-button" onClick={clickEvent}>
          {renderChildren}
        </button>
      )}
    </div>
  );
}

export default Barbutton;
