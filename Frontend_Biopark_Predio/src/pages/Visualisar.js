import { useEffect, useState } from "react";
import axios from "axios";
import './Visualisar.css';


const Predios = ({ predios }) => {
  return (



    <div className="Predios">


{predios.map(predio => {
  return (
    <div className="Predio">
      <div className="Telhado"/>
      
      {/* Loop para os andares */}
      {[...Array(predio.tamanho)].map((_, index) => (
        <div className="Container_Predio" key={index}>
          <div className="Telhado-Andar"/>
          <div className="Infobox">
          <div className="Nomepredio"><p>Nome :</p><p>{predio.apartamentos[index]?.nome || 'Sem nome'}</p></div>
          <div className="Nomepredio"><p>Locador :</p><p>{predio.apartamentos[index]?.locador || 'Biopark'}</p></div>
          <div className="Nomepredio"><p>Valor :</p><p>{predio.apartamentos[index]?.valor || 'Não cadastrado'}</p></div>
          </div>
          <div className="Andar">
          <div className="Janela" 
          style={{
            backgroundColor: predio.apartamentos[index]?.disponibilidade ? "#81B622" : "#CB4E47",
            boxShadow: predio.apartamentos[index]?.disponibilidade ? "inset -7px 7px 1px -1px rgba(89,152,26)" : "inset -7px 7px 1px -1px #A82810"
          }}/> 
          <div className="Janela" 
          style={{
            backgroundColor: predio.apartamentos[index]?.disponibilidade ? "#81B622" : "#CB4E47",
            boxShadow: predio.apartamentos[index]?.disponibilidade ? "inset -7px 7px 1px -1px rgba(89,152,26)" : "inset -7px 7px 1px -1px #A82810"
          }}/> 
          <div className="Janela" 
          style={{
            backgroundColor: predio.apartamentos[index]?.disponibilidade ? "#81B622" : "#CB4E47",
            boxShadow: predio.apartamentos[index]?.disponibilidade ? "inset -7px 7px 1px -1px rgba(89,152,26)" : "inset -7px 7px 1px -1px #A82810"
          }}/> 
          </div>
        </div>
      ))}

      <div className="Telhado-Andar"/>
      <div className="Infobox">
      <div className="Nomepredio"><p>Nome :</p><p>{predio.nome || 'Sem nome'}</p></div>
      </div>
      <div className="Terreo">
        <div className="Janela"/> 
        <div className="Porta"/> 
        <div className="Janela"/> 
      </div>
    </div>
  );
})}



</div>





  );
};

function Visualisar() {

  async function getPredios() {
  const response = await axios.get("http://localhost:3333/predios")
  console.log(response)
  setPredios(response.data);
}

async function handleCreateReserva() {
  const response = await axios.post("http://localhost:3333/reserva", {
    nome: inputNome,
    email: inputEmail,
    contato: inputContato,
    mensagem: inputMensagem
  });
  setPredios([...predios, response.data]);
  setInputNome("");
  setInputEmail("");
  setInputContato("");
  setInputMensagem("");

  window.location.reload();
}


  const [predios, setPredios] = useState([]);

  const [inputNome, setInputNome] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputContato, setInputContato] = useState("");
  const [inputMensagem, setInputMensagem] = useState("");

  useEffect(() => {
    getPredios();
  }, []);

  return (
    <div className="App">
      <header className="App-header">

        <div>
          <h2>Bem vindo a tela do comprador !</h2>
          <h3>Aqui você pode enviar uma mensagem junto de seu contato para agendar uma reserva !</h3>
          <h4>Apartamentos com a Janela Verde🟩 estão disponiveis, apartamentos com a janela vermelha🟥 estão ocupados ou indisponiveis</h4>
          </div>

        <Predios predios={predios}></Predios>

        <button className="BotãodeChamada"  onClick={handleCreateReserva}><h3>Pedir Reserva</h3></button>
        <div className="CaixaDeEdição">
        <h4>Nome:</h4>
        <input
          type="text"
          value={inputNome}
          onChange={(e) => setInputNome(e.target.value)}
        />
        <h4>Email:</h4>
        <input
          type="text"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
        />
        <h4>Contato:</h4>
        <input
          type="text"
          value={inputContato}
          onChange={(e) => setInputContato(e.target.value)}
        />
        <h4>Mensagem:</h4>
        <input
          type="text"
          value={inputMensagem}
          onChange={(e) => setInputMensagem(e.target.value)}
        />
        </div>

      </header>
    </div>

    
  );
}

export default Visualisar;
