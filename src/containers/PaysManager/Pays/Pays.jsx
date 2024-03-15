const pays = (props) => {
  return (
    <div className="row no-gutters border m-2">
      <div className="col-4">
        <img src={props.drapeau} className="img-fluid p-2" alt={props.nom} />
      </div>
      <div className="col">
        <h2 className="text-dark">Nom : {props.nomFrancais}</h2>
        <div>Capital : {props.capitale}</div>
        <div>Région : {props.region}</div>
      </div>
    </div>
  );
};

export default pays;
