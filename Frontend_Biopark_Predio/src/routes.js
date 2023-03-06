import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "./pages/Login";
import Visualisar_adm from "./pages/Visualisar_adm";
import Visualisar from "./pages/Visualisar";
import VisualisarReserva_adm from "./pages/VisualisarReserva_adm";
import App from "./App"

function Rotas() {
    return (
        <Routes>
            <Route path="/" element={<Visualisar_adm/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/visualisar_adm" element={<Visualisar_adm/>} />
            <Route path="/visualisar" element={<Visualisar/>} />
            <Route path="/visualisarreserva_adm" element={<VisualisarReserva_adm/>} />

        </Routes>
    )
}

export default Rotas;