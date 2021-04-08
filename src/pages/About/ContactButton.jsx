function ContactButton({ img, children, href }) {
  return (
    <a className="buttonLink" href={href} target="_blank" rel="noreferrer">
      <div>
        <img className="contactButtonIcon" src={img} alt={children} />
      </div>
    </a>
  );
}

export default ContactButton;
