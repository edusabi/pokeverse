import { useState } from "react";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import styles from "./Home.module.css";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleRegisterSuccess = () => {
    setToastMessage("Conta criada com sucesso 🎉");
    setShowToast(true);
    setIsLogin(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleLoginSuccess = async () => {
    try {
      // 🔥 busca usuário usando JWT do cookie
      const { data } = await axios.get(
        "http://localhost:3000/users/me",
        { withCredentials: true }
      );

      if (!data) return;

      if (!data.trainer_profile_created) {
        setToastMessage("Login feito com sucesso! Redirecionando...");
        setShowToast(true);

        setTimeout(() => {
          setShowToast(false);
          navigate("/perfil");
        }, 3000);
      } else {
        navigate("/paginaInicial");
      }
    } catch (error) {
      console.error("Erro ao validar sessão:", error);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.info}>
          <h2>{isLogin ? "Bem-vindo de volta" : "Crie sua conta"}</h2>
          <p>
            {isLogin
              ? "Entre com seus dados para continuar no PokeVerse."
              : "Registre-se e comece sua jornada como treinador."}
          </p>

          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Criar conta" : "Já tenho conta"}
          </button>
        </div>

        <div className={styles.formArea}>
          <h3>{isLogin ? "Login" : "Registro"}</h3>

          <div
            className={`${styles.formWrapper} ${
              isLogin ? styles.login : styles.register
            }`}
          >
            {isLogin ? (
              <Login onSuccess2={handleLoginSuccess} />
            ) : (
              <Register onSuccess={handleRegisterSuccess} />
            )}
          </div>
        </div>
      </div>

      {showToast && (
        <div className={styles.toast}>
          <FaCheck />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default Home;
