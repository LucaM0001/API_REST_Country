const bouton = (props) => {
  const btnCss = `btn ${props.typeBtn} ${props.css}`;
  return (
    <button
      className={btnCss}
      style={props.estSelection ? { opacity: "1" } : { opacity: "0.7" }}
      onClick={props.clic}
    >
      {props.children}
    </button>
  );
};

export default bouton;
