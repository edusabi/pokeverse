import { useState } from "react";
import styles from "./Register.module.css";
import { IMaskInput } from "react-imask";
import axios from "axios";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

const Register = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const formRegister = async (e) => {
    e.preventDefault();

    if (!email || !cpf || !password || !confirmarSenha) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    if (password !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    if (!hasMinLength || !hasUppercase || !hasSymbol || !hasNumber) {
      alert("A senha não atende aos requisitos de segurança!");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:3000/users/register", {
        email,
        cpf,
        password,
      });

      onSuccess(); // 🔥 volta para login
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={formRegister} className={styles.form}>
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
        <span className={styles.labelText}>CPF</span>
        <IMaskInput
          mask="000.000.000-00"
          value={cpf}
          onAccept={(value) => setCpf(value)}
          className={styles.input}
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

      <div className={styles.passwordRules}>
        <p className={hasMinLength ? styles.valid : styles.invalid}><FaCheck /> 6 caracteres</p>
        <p className={hasUppercase ? styles.valid : styles.invalid}><FaCheck /> Letra maiúscula</p>
        <p className={hasNumber ? styles.valid : styles.invalid}><FaCheck /> Número</p>
        <p className={hasSymbol ? styles.valid : styles.invalid}><FaCheck /> Símbolo</p>
      </div>

      <label className={styles.label}>
        <span className={styles.labelText}>Confirmar senha</span>
        <div className={styles.passwordField}>
          <input
            type={showPassword ? "text" : "password"}
            className={styles.input}
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
        </div>
      </label>

      <button className={styles.button} disabled={loading}>
        {loading ? "Criando conta..." : "Registrar"}
      </button>
    </form>
  );
};

export default Register;
