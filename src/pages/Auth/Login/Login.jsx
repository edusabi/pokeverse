const Login = () => {
  return (
    <div>
      <form>
        
        <label>
          <span>E-mail</span>
          <input 
            type='email'
           />
        </label>
        
        <label>
          <span>Senha</span>
          <input 
            type='password'
          />
        </label>

        <button>Entrar</button>

      </form>
    </div>
  )
}

export default Login