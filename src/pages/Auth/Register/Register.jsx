const Register = () => {
  return (
    <div>
        <form>
        
        <label>
          <span>Nome do treinador</span>
          <input 
            type='text'
           />
        </label>
        
        <label>
          <span>Sexo:</span>

          <input type='radio' id="masculino" value="M" />
          <span>Masculino</span>
          <input type='radio' id="feminino" value="F" />
          <span>Feminino</span>
        </label>
        
        <label>
          <span>E-mail</span>
          <input 
            type='email'
           />
        </label>
        
        <label>
          <span>CPF</span>
          <input 
            type='text'
           />
        </label>
        
        <label>
          <span>Senha</span>
          <input 
            type='password'
          />
        </label>

        <label>
          <span>Confirmar senha</span>
          <input 
            type='password'
          />
        </label>

        <button>Registro</button>

      </form>

    </div>
  )
}

export default Register