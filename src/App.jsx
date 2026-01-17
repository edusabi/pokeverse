import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
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
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      const res = await axios.get(
        "https://pokeverse.discloud.app/users/user"
      );
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <BrowserRouter>
      <Navbar user={user} loading={loadingUser} />

      <Routes>
        {/* PÚBLICA */}
        <Route path="/" element={<Home />} />

        {/* PRIVADAS */}
        <Route
          path="/paginaInicial"
          element={
            <ProtectedRoute user={user} loading={loadingUser}>
              <PageInitial />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tipos"
          element={
            <ProtectedRoute user={user} loading={loadingUser}>
              <SistemaTipos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trocas"
          element={
            <ProtectedRoute user={user} loading={loadingUser}>
              <TrocaPokemon />
            </ProtectedRoute>
          }
        />

        <Route
          path="/missoes"
          element={
            <ProtectedRoute user={user} loading={loadingUser}>
              <MissoesDiarias />
            </ProtectedRoute>
          }
        />

        <Route
          path="/loja"
          element={
            <ProtectedRoute user={user} loading={loadingUser}>
              <LojaItens />
            </ProtectedRoute>
          }
        />

        <Route
          path="/perfil"
          element={
            <ProtectedRoute user={user} loading={loadingUser}>
              <Perfil user={user} reloadUser={loadUser} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
