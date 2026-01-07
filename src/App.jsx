import {BrowserRouter, Routes, Route} from "react-router-dom"

//pages
import Home from "./pages/Home/Home";
import SistemaTipos from "./pages/SistemaTipos/SistemaTipos";
import TrocaPokemon from "./pages/TrocaPokemon/TrocaPokemon";
import MissoesDiarias from "./pages/MissoesDiarias/MissoesDiarias";
import LojaItens from "./pages/LojaItens/LojaItens";
import Perfil from "./pages/Perfil/Perfil";

///components
import Navbar from "./components/Navbar/Navbar";

function App() {

  return (
      <div>
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/tipos" element={<SistemaTipos/>} />
            <Route path="/trocas" element={<TrocaPokemon/>} />
            <Route path="/missoes" element={<MissoesDiarias/>} />
            <Route path="/loja" element={<LojaItens/>} />
            <Route path="/perfil" element={<Perfil/>} />
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App
