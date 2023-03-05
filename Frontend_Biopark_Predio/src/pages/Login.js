import './Login.css';


import ListarPredios from '../components/ListarPredios';

function Login() {
  const andares = [
    { id: 1, andar: 1, cobertura: true },
    { id: 2, andar: 2, cobertura: false },
    { id: 3, andar: 3, cobertura: false }
  ]

  const listaDePredios = [
    { id: 1, andares: andares },
    { id: 2, andares: andares },
    { id: 3, andares: andares },
    { 
      id: 4, 
      andares: [
        { id: 1, andar: 1, cobertura: true },
        { id: 2, andar: 2, cobertura: false },
        { id: 3, andar: 3, cobertura: false },
        { id: 4, andar: 3, cobertura: false },
        { id: 5, andar: 3, cobertura: false },
        { id: 6, andar: 3, cobertura: false },
      ]
    },
    { 
      id: 5, 
      andares: [
        { id: 1, andar: 1, cobertura: true },
        { id: 2, andar: 2, cobertura: false },
        { id: 3, andar: 3, cobertura: false },
        { id: 4, andar: 3, cobertura: false },
        { id: 5, andar: 3, cobertura: false },
      ]
    },
    { id: 6, andares: andares },
    { id: 7, andares: andares }
  ]
  
  return (
    <div className="App">
      <header className="App-header">
        <ListarPredios listaDePredios={listaDePredios} />

        <div className="Calcada"> <div className="Rua"/> </div>
      </header>
    </div>
  );
}

export default Login;
