import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

// pages
import Home from "./pages/Home/Home";
import PageInitial from "./pages/PageInitial/PageInitial";
import Perfil from "./pages/Perfil/Perfil";

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
        {/* HOME */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/paginaInicial" replace />
            ) : (
              <Home onLoginSuccess={loadUser} />
            )
          }
        />

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
          path="/perfil"
          element={
            <ProtectedRoute user={user} loading={loadingUser}>
              <Perfil user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
