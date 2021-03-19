import Out from "./out.svg";

function Modal({ title, didClose, children, isOpen, contentRelation }) {
  if (!isOpen && !children) {
    return null;
  }

  let containerClass = "modal-overlay";
  if (contentRelation === "fit-content") {
    containerClass += " modal-fit-content";
  } else if (contentRelation === "scroll") {
    containerClass += " modal-scroll";
  }

  return (
    <div className={containerClass}>
      <div className="modal-content">
        {title && <h2>{title}</h2>}
        {children}
        <button className="modal-button" onClick={didClose}>
          <img src={Out} alt="Out" />
        </button>
      </div>
    </div>
  );
}

export default Modal;
