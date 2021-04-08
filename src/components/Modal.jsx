import Out from "../assets/Utility/out.svg";

function Modal({ title, didClose, children, isOpen, contentRelation }) {
  if (!isOpen || !children) {
    return null;
  }

  let containerClass = "modal-content";
  if (contentRelation === "fit-content") {
    containerClass += " modal-fit-content";
  } else if (contentRelation === "scroll") {
    containerClass += " modal-scroll";
  }

  return (
    <div className="modal-overlay">
      <div className={containerClass}>
        <div>
          {title && <h2>{title}</h2>}
          {children}
        </div>
        <button className="modal-button" onClick={didClose}>
          <img src={Out} alt="Out" />
        </button>
      </div>
    </div>
  );
}

export default Modal;
