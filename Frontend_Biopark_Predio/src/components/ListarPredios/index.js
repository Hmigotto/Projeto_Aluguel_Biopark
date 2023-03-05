import "./ListarPredios.css";

import Predio from "../Predio";

function ListarPredios(props) {
  return (
    <div className="Predios-div">
      {props.listaDePredios.map(predio => (
        <Predio 
          key={predio.id} 
          andares={predio.andares} 
        />
      ))}
    </div>
  )
}

export default ListarPredios;