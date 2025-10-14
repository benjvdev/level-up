import React, { useRef, useState } from 'react'
import './Register.css'
import TopBar from '../../organisms/Top Bar/TopBar'
export default function Register() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [clave1, setClave1] = useState('')
  const [clave2, setClave2] = useState('')
  const [error, setError] = useState('')
  const formRef = useRef(null)

  const handleName = (e) =>{
    const valor = e.target.value;
    setNombre(valor);
    setError(valor.length < 3 ? 'Error, ingrese 3 caracteres como minimo!' : '')
  }
  const handleMail = (e) =>{
    const valor = e.target.value;
    setEmail(valor)
    setError(valor.includes('@')?'':'Error, el email debe contener @!')
  }
  const handlePassword2 = (e) =>{
    const valor = e.target.value;
    setClave2(valor)
    setError(clave1==valor?'':'Error, las claves no coinciden!!')
  }

  const handlePassword1 = (e) =>{
    const valor = e.target.value;
    setClave1(valor)
    setError(clave2==valor?'':'Error, las claves no coinciden!!')
  }


  const handleSubmit = (e) =>{
    const inputs = formRef.current.querySelectorAll('input');
    for(let input of inputs){
      if(input.classList.contains('error')){
        e.preventDefault();
        setError('Error faltan campos por completar!');
        return;
      }
    }
  }

  return (
  <>
  <TopBar/>
  <div id="form-container">
    <form action="#" id="register-form" ref={formRef} onSubmit={handleSubmit}>
          <h1>Crear nueva cuenta</h1>
          <div className="row">
              <label htmlFor="nombres">Nombres:</label>
              <input type="text" id="nombres" placeholder="Juan Andres"
                onChange={handleName} value={nombre}
                className={nombre.length<3?'error':''}
              />
          </div>
          <div className="row">
              <label htmlFor="apellidos">Apellidos:</label>
              <input type="text" id="apellidos" placeholder="Perez Muñoz"
              />
          </div>
          <div className="row">
              <label htmlFor="email">E-mail:</label>
              <input type="text" id="email" placeholder="juanito@gmail.com"
                onChange={handleMail} value={email}
                className={email.includes('@')?'':'error'}
              />
          </div>
          <div className="row">
              <label htmlFor="direccion">Dirección:</label>
              <input type="text" id="direccion" placeholder="Los Molles #25"/>
          </div>
          <div className="row">
              <label htmlFor="clave1">Contraseña:</label>
              <input type="password" id="clave1"
                value={clave1} onChange={handlePassword1}
                className={clave1==clave2?'':'error'}
              />
          </div>
          <div className="row">
              <label htmlFor="clave2">Confirmar contraseña:</label>
              <input type="password" id="clave2"
              value={clave2} onChange={handlePassword2}/>
          </div>
          <p id="errores">{error}</p>
          <div className="button-container">
            <button type="reset">Limpiar</button>
            <button type="submit">Registrarme</button>  
          </div>
      </form>
    </div>
  </>
  )
}
