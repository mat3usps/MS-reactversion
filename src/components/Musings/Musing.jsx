function Musing({ content, children }) {
  return (
    <div className="musing">
      <h2>{children}</h2>
      <p>{content}</p>
    </div>
  );
}
export default Musing;
