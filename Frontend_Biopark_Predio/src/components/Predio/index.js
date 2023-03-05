import './Predio.css';
import { Fragment } from 'react';

import Andar from "../Andar";

function Predio(props) {
  return (
    <div className="Predio">
      <div className="Telhado" />

      {props.andares.map(andar => {
        return (
          <Fragment key={andar.id}>
            {!andar.cobertura && <div className="Telhado-Andar" />}
            <Andar key={andar.id} andar={andar} />
          </Fragment>
        )
      })}

      <div className="Telhado-Andar"/>
        <div className="Terreo">
          <div className="Janela"/> 
          <div className="Porta"/> 
          <div className="Janela"/> 
        </div>
    </div>
  )
}

export default Predio;