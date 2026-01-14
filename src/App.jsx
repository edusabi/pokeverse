import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// pages
import Home from "./pages/Home/Home";
import SistemaTipos from "./pages/SistemaTipos/SistemaTipos";
import TrocaPokemon from "./pages/TrocaPokemon/TrocaPokemon";
import MissoesDiarias from "./pages/MissoesDiarias/MissoesDiarias";
import LojaItens from "./pages/LojaItens/LojaItens";
import Perfil from "./pages/Perfil/Perfil";
import PageInitial from "./pages/PageInitial/PageInitial";

// components
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://pokeverse.discloud.app/users/user", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} loading={loadingUser} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paginaInicial" element={<PageInitial />} />
        <Route path="/tipos" element={<SistemaTipos />} />
        <Route path="/trocas" element={<TrocaPokemon />} />
        <Route path="/missoes" element={<MissoesDiarias />} />
        <Route path="/loja" element={<LojaItens />} />
        <Route path="/perfil" element={<Perfil user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
