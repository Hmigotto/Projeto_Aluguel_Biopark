import { useEffect, useState } from "react";
import axios from "axios";
import './VisualisarReserva_adm.css';
import React from 'react';



const Reservas = ({ reservas }) => {
  return (
    <div className="Reservas_container">

{reservas.map(reserva => {
  return (
    <div className="Reservas_mostra" key={reserva.id}>
      <div><p>Nome : {reserva.nome || 'Sem nome'}</p></div>
      <div><p>Email : {reserva.email || 'Sem email'}</p></div>
      <div><p>Contato : {reserva.contato || 'Sem contato'}</p></div>
      <div><p>Mensagem : {reserva.mensagem || 'Sem mensagem'}</p></div>
    </div>
  );
})}
    </div>
    
  );
};

function VisualisarReserva_adm() {
  const [reservas, setReservas] = useState([]);

  async function getReservas() {
    const response = await axios.get("http://localhost:3333/reserva")
    console.log(response)
    setReservas(response.data);
  }

  useEffect(() => {
    getReservas();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="CaixaDeReservas">
          <h1>Reservas</h1>
          <Reservas reservas={reservas} />
        </div>
      </header>
    </div>
  );
}

export default VisualisarReserva_adm;
