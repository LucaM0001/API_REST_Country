const titreh1 = (props) => {
  const classCss = `border border-dark p-2 mt-2 text-white text-center bg-primary rounded`;
  return <h1 className={classCss}>{props.children}</h1>;
};

export default titreh1;
