import { useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Login = ({ onSuccess2 }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setSenha] = useState("");
  const [email, setEmail] = useState("");

  const formLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/users/login",
        { email, password },
        { withCredentials: true } 
      );

      onSuccess2();
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Email ou senha inválidos");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={formLogin} className={styles.form}>
        <label className={styles.label}>
          <span className={styles.labelText}>E-mail</span>
          <input
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className={styles.label}>
          <span className={styles.labelText}>Senha</span>
          <div className={styles.passwordField}>
            <input
              type={showPassword ? "text" : "password"}
              className={styles.input}
              value={password}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>
        </label>

        <button className={styles.button}>Entrar</button>
      </form>
    </div>
  );
};

export default Login;
