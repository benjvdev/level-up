import React from 'react'

export default function Login() {
  return (
      <form action="#" id='login-modal'>
        <h1>Iniciar sesión</h1>
          <input type="text" id='email' placeholder='Correo'/>
          <input type="password" id='email' placeholder='Contraseña'/>
          <p style={{color: "#5badffff", fontSize: ".9rem"}}>
            Aun no tienes cuenta? Registrate <a href="/Register" 
            style={{color: "#5badffff", fontSize: ".9rem"}}>
            aquí
            </a>
          </p>
        <button type='submit'>Iniciar sesión</button>
      </form>
  )
}
