import { useState } from "react";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import styles from "./Home.module.css";
import { FaCheck } from "react-icons/fa6";

const Home = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleRegisterSuccess = () => {
    setToastMessage("Conta criada com sucesso 🎉");
    setShowToast(true);
    setIsLogin(true);

    setTimeout(() => setShowToast(false), 3000);
  };

  const handleLoginSuccess = async () => {
    setToastMessage("Login feito com sucesso! 🚀");
    setShowToast(true);

    // 🔥 SÓ atualiza o user
    await onLoginSuccess();

    setTimeout(() => setShowToast(false), 1500);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.info}>
          <h2>{isLogin ? "Bem-vindo de volta" : "Crie sua conta"}</h2>

          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Criar conta" : "Já tenho conta"}
          </button>
        </div>

        <div className={styles.formArea}>
          <h3>{isLogin ? "Login" : "Registro"}</h3>

          <div className={styles.formWrapper}>
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
