import { useEffect, useState } from "react";
import axios from "axios";
import './Visualisar_adm.css';


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
          <div className="Nomepredio"><p>Nome/ID :</p><p>{predio.apartamentos[index]?.nome || 'Sem nome'}</p><p>/{predio.apartamentos[index]?.id || 'id'}</p></div>
          <div className="Nomepredio"><p>Locador :</p><p>{predio.apartamentos[index]?.locador || 'Biopark'}</p></div>
          <div className="Nomepredio"><p>Locatario :</p><p>{predio.apartamentos[index]?.locatario || 'Sem Locatario'}</p></div>
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
      <div className="Nomepredio"><p>Nome/ID :</p><p>{predio.nome || 'Sem nome'}</p><p>/{predio.id || 'id'}</p></div>
      <div className="Nomepredio"><p>Tamanho :</p><p>{predio.tamanho || 'Sem tamanho'}</p></div>
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

function Visualisar_adm() {

  async function getPredios() {
  const response = await axios.get("http://localhost:3333/predios")
  console.log(response)
  setPredios(response.data);
}

async function handleCreatePredio() {
  const response = await axios.post("http://localhost:3333/predios", {
    nome: inputValueCreatePredioName,
    tamanho: parseInt(inputValueCreatePredioTamanho),
    apartamentos: [
      {
        nome: "Apt 0",
        disponibilidade: true,
        locador: "Biopark",
        locatario: "Nenhum",
        valor: 0,
      },
    ]
  });
  setPredios([...predios, response.data]);
  setInputValueCreatePredioName("");
  setInputValueCreatePredioTamanho("");
}

async function handleCreateApartamento() {
  const response = await axios.post(`http://localhost:3333/predios/${inputValueCreateApartamentoPredioID}`, {
    nome: inputValueCreateApartamentoNome,
    disponibilidade: Boolean(inputValueCreateApartamentoDisponibilidade),
    locador: inputValueCreateApartamentoLocador,
    locatario: inputValueCreateApartamentoLocatario,
    valor: parseInt(inputValueCreateApartamentoValor),
  });

  setInputValueCreateApartamentoPredioID("");
  setInputValueCreateApartamentoNome("");
  setInputValueCreateApartamentoDisponibilidade("");
  setInputValueCreateApartamentoLocador("");
  setInputValueCreateApartamentoLocatario("");
  setInputValueCreateApartamentoValor("");
  
  window.location.reload();
}


async function handleEditPredio() {
  const response = await axios.put(`http://localhost:3333/predios/${inputValueEditPredioID}`, {
    nome: inputValueEditPredioName,
    tamanho: parseInt(inputValueEditePredioTamanho),
  });

  setPredios(predios.map(predio => {
    if (predio.id === inputValueEditPredioID) {
      return {
        ...predio,
        nome: inputValueEditPredioName,
        tamanho: parseInt(inputValueEditePredioTamanho),
      }
    }
    return predio;
  }));

  setinputValueEditPredioID("");
  setinputValueEditPredioName("");
  setinputValueEditePredioTamanho("");

  window.location.reload();
}

async function handleEditApartamento() {
  const response = await axios.put(
    `http://localhost:3333/predios/${inputValueEditApartamentoPredioID}/${inputValueEditApartamentoID}`,
    {
      nome: inputValueEditApartamentoNome,
      disponibilidade: Boolean(inputValueEditApartamentoDisponibilidade),
      locador: inputValueEditApartamentoLocador,
      locatario: inputValueEditApartamentoLocatario,
      valor: parseInt(inputValueEditApartamentoValor),
    }
  );

  setPredios(
    predios.map((predio) => {
      if (predio.id === inputValueEditApartamentoPredioID) {
        const apartamentosAtualizados = predio.apartamentos.map((apartamento) => {
          if (apartamento.id === inputValueEditApartamentoID) {
            return {
              ...apartamento,
              nome: inputValueEditApartamentoNome,
              disponibilidade: Boolean(inputValueEditApartamentoDisponibilidade),
              locador: inputValueEditApartamentoLocador,
              locatario: inputValueEditApartamentoLocatario,
              valor: parseInt(inputValueEditApartamentoValor),
            };
          }
          return apartamento;
        });

        return {
          ...predio,
          apartamentos: apartamentosAtualizados,
        };
      }
      return predio;
    })
  );

  setInputValueEditApartamentoPredioID("");
  setInputValueEditApartamentoID("");
  setInputValueEditApartamentoNome("");
  setInputValueEditApartamentoDisponibilidade("");
  setInputValueEditApartamentoLocador("");
  setInputValueEditApartamentoLocatario("");
  setInputValueEditApartamentoValor("");

  window.location.reload();
}

async function handleRemovePredio() {
    const response = await axios.delete(`http://localhost:3333/predios/${inputValueDeletePredioID}`);
    console.log(response.data); 

    window.location.reload();
}

async function handleRemoveApartamento() {
  const response = await axios.delete(`http://localhost:3333/predios/${inputValueDeleteApartamentoPredioID}/${inputValueDeleteApartamentoID}`);
  console.log(response.data); 

  window.location.reload();
}


  const [predios, setPredios] = useState([]);

  const [inputValueCreatePredioName, setInputValueCreatePredioName] = useState("");
  const [inputValueCreatePredioTamanho, setInputValueCreatePredioTamanho] = useState("");

  const [inputValueCreateApartamentoPredioID, setInputValueCreateApartamentoPredioID] = useState("");
  const [inputValueCreateApartamentoNome, setInputValueCreateApartamentoNome] = useState("");
  const [inputValueCreateApartamentoDisponibilidade, setInputValueCreateApartamentoDisponibilidade] = useState("");
  const [inputValueCreateApartamentoLocador, setInputValueCreateApartamentoLocador] = useState("");
  const [inputValueCreateApartamentoLocatario, setInputValueCreateApartamentoLocatario] = useState("");
  const [inputValueCreateApartamentoValor, setInputValueCreateApartamentoValor] = useState("");

  const [inputValueEditPredioID, setinputValueEditPredioID] = useState("");
  const [inputValueEditPredioName, setinputValueEditPredioName] = useState("");
  const [inputValueEditePredioTamanho, setinputValueEditePredioTamanho] = useState("");
  
  const [inputValueEditApartamentoPredioID, setInputValueEditApartamentoPredioID] = useState("");
  const [inputValueEditApartamentoID, setInputValueEditApartamentoID] = useState("");
  const [inputValueEditApartamentoNome, setInputValueEditApartamentoNome] = useState("");
  const [inputValueEditApartamentoDisponibilidade, setInputValueEditApartamentoDisponibilidade] = useState("");
  const [inputValueEditApartamentoLocador, setInputValueEditApartamentoLocador] = useState("");
  const [inputValueEditApartamentoLocatario, setInputValueEditApartamentoLocatario] = useState("");
  const [inputValueEditApartamentoValor, setInputValueEditApartamentoValor] = useState("");

  const [inputValueDeletePredioID, setIinputValueDeletePredioID] = useState("");

  const [inputValueDeleteApartamentoPredioID, setInputValueDeleteApartamentoPredioID] = useState("");
  const [inputValueDeleteApartamentoID, setIinputValueDeleteApartamentoID] = useState("");

  useEffect(() => {
    getPredios();
  }, []);

  return (
    <div className="App">
      <header className="App-header">

        <div className="Margintoper"></div>

        <div >
          <h2>Bem vindo a tela do ADM !</h2>
          <h3>Aqui você pode modificar ou criar novos apartamentos, assim como ver informações que não estão</h3>
          <h3>normalmente disponiveis para o usuario, como por exemplo o ID, o locador e o locatario</h3>
          <h3>Aqui estão listados todos os predios. Caso o numero de predios aumente muito sera preciso ultilizar a barra de rolamento para a direita</h3>
          <h2>Apartamentos com a Janela Verde🟩 estão disponiveis, apartamentos com a janela vermelha🟥 estão ocupados ou indisponiveis</h2>
        </div>

        <Predios predios={predios}></Predios>

        <button className="BotãodeChamada"  onClick={handleCreatePredio}><h3>Criar Predio</h3></button>
        <div className="CaixaDeEdição">
        <h4>Nome:</h4>
        <input
          type="text"
          value={inputValueCreatePredioName}
          onChange={(e) => setInputValueCreatePredioName(e.target.value)}
        />
        <h4>Tamanho:</h4>
        <input
          type="text"
          value={inputValueCreatePredioTamanho}
          onChange={(e) => setInputValueCreatePredioTamanho(e.target.value)}
        />
        </div>


        <button className="BotãodeChamada" onClick={handleCreateApartamento}>
  <h3>Criar Apartamento</h3>
</button>
<div className="CaixaDeEdição">
  <h4>ID do Predio*:</h4>
  <input
    type="text"
    value={inputValueCreateApartamentoPredioID}
    onChange={(e) => setInputValueCreateApartamentoPredioID(e.target.value)}
  />
  <h4>Nome:</h4>
  <input
    type="text"
    value={inputValueCreateApartamentoNome}
    onChange={(e) => setInputValueCreateApartamentoNome(e.target.value)}
  />
  <h4>Disponibilidade:</h4>
  <input
    type="checkbox"
    checked={inputValueCreateApartamentoDisponibilidade}
    onChange={(e) => setInputValueCreateApartamentoDisponibilidade(e.target.checked)}
  />
  <h4>Locador:</h4>
  <input
    type="text"
    value={inputValueCreateApartamentoLocador}
    onChange={(e) => setInputValueCreateApartamentoLocador(e.target.value)}
  />
  <h4>Locatario:</h4>
  <input
    type="text"
    value={inputValueCreateApartamentoLocatario}
    onChange={(e) => setInputValueCreateApartamentoLocatario(e.target.value)}
  />
  <h4>Valor:</h4>
  <input
    type="text"
    value={inputValueCreateApartamentoValor}
    onChange={(e) => setInputValueCreateApartamentoValor(e.target.value)}
  />
</div>

<button className="BotãodeChamada" onClick={handleEditPredio}><h3>Editar Prédio</h3></button>
<div className="CaixaDeEdição">
  <h4>ID do Prédio*:</h4>
  <input
    type="text"
    value={inputValueEditPredioID}
    onChange={(e) => setinputValueEditPredioID(e.target.value)}
  />
  <h4>Nome:</h4>
  <input
    type="text"
    value={inputValueEditPredioName}
    onChange={(e) => setinputValueEditPredioName(e.target.value)}
  />
  <h4>Tamanho:</h4>
  <input
    type="text"
    value={inputValueEditePredioTamanho}
    onChange={(e) => setinputValueEditePredioTamanho(e.target.value)}
  />
</div>

        <button className="BotãodeChamada" onClick={handleEditApartamento}><h3>Editar Apartamento</h3></button>
        <div className="CaixaDeEdição">
        <h4>ID do Predio*:</h4>
        <input
    type="text"
    value={inputValueEditApartamentoPredioID}
    onChange={(e) => setInputValueEditApartamentoPredioID(e.target.value)}
  />
        <h4>ID do Apartamento*:</h4>
        <input
    type="text"
    value={inputValueEditApartamentoID}
    onChange={(e) => setInputValueEditApartamentoID(e.target.value)}
  />
        <h4>Nome:</h4>
        <input
    type="text"
    value={inputValueEditApartamentoNome}
    onChange={(e) => setInputValueEditApartamentoNome(e.target.value)}
  />
        <h4>Disponibilidade:</h4>
        <input
    type="checkbox"
    checked={inputValueEditApartamentoDisponibilidade}
    onChange={(e) => setInputValueEditApartamentoDisponibilidade(e.target.checked)}
  />
        <h4>Locador:</h4>
        <input
    type="text"
    value={inputValueEditApartamentoLocador}
    onChange={(e) => setInputValueEditApartamentoLocador(e.target.value)}
  />
        <h4>Locatario:</h4>
        <input
    type="text"
    value={inputValueEditApartamentoLocatario}
    onChange={(e) => setInputValueEditApartamentoLocatario(e.target.value)}
  />
        <h4>Valor:</h4>
        <input
    type="text"
    value={inputValueEditApartamentoValor}
    onChange={(e) => setInputValueEditApartamentoValor(e.target.value)}
  />
        </div>


        <button className="BotãodeChamada" onClick={handleRemovePredio}><h3>Remover Predio</h3></button>
        <div className="CaixaDeEdição">
        <h4>ID do Predio*:</h4>
        <input
    type="text"
    value={inputValueDeletePredioID}
    onChange={(e) => setIinputValueDeletePredioID(e.target.value)}
  />
        </div>


        <button className="BotãodeChamada" onClick={handleRemoveApartamento}><h3>Remover Apartamento</h3></button>
        <div className="CaixaDeEdição">
        <h4>ID do Predio*:</h4>
        <input
    type="text"
    value={inputValueDeleteApartamentoPredioID}
    onChange={(e) => setInputValueDeleteApartamentoPredioID(e.target.value)}
  />
        <h4>ID do Apartamento*:</h4>
        <input
    type="text"
    value={inputValueDeleteApartamentoID}
    onChange={(e) => setIinputValueDeleteApartamentoID(e.target.value)}
  />
        </div>

      </header>
    </div>

    
  );
}

export default Visualisar_adm;
