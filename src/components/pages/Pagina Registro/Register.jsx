import React, { useEffect, useRef, useState } from 'react'
import './Register.css'
import TopBar from '../../organisms/Top Bar/TopBar'
export default function Register() {
  const [nombre, setNombre] = useState('')
  const [errorNombre, setErrorNombre] = useState('');
  const [email, setEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState('');
  const [clave1, setClave1] = useState('')
  const [clave2, setClave2] = useState('')
  const [errorClaves, setErrorClaves] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [errorFecha, setErrorFecha] = useState('');
  const [errorSubmit, setErrorSubmit] = useState('');
  const formRef = useRef(null)
  const mostrarError = errorNombre || errorEmail || errorFecha || errorClaves || errorSubmit;

  const handleName = (e) =>{
    const valor = e.target.value;
    setNombre(valor);
    setErrorNombre(valor.length < 3 ? 'El nombre debe contener 3 caracteres como minimo!' : '' )
  }
  const handleMail = (e) =>{
    const valor = e.target.value;
    setEmail(valor)
    setErrorEmail(valor.includes('@')?'':'El email debe contener @!')
  }
  const handleFechaChange = (e) => {
  let valor = e.target.value.replace(/\D/g, "");

  if (valor.length > 2 && valor.length <= 4) {
    valor = valor.slice(0, 2) + "-" + valor.slice(2);
  } else if (valor.length > 4) {
    valor = valor.slice(0, 2) + "-" + valor.slice(2, 4) + "-" + valor.slice(4, 8);
  }

  setFechaNacimiento(valor);
  setErrorFecha(valor||valor.length===0?'Error, debes ingresar una fecha':'')
  if (valor.length === 10) {
    const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
    if (!regex.test(valor)) {
      setErrorFecha("Formato inválido (usa DD-MM-YYYY)");
      return;
    }

    const [_, dia, mes, año] = valor.match(regex);
    const fechaNac = new Date(`${año}-${mes}-${dia}`);
    const hoy = new Date();
    if (
      isNaN(fechaNac.getTime()) ||
      parseInt(dia) > 31 ||
      parseInt(mes) > 12 ||
      parseInt(año) > hoy.getFullYear() ||
      parseInt(año) < hoy.getFullYear() - 120 
    ) {
      setErrorFecha("La fecha que intentas ingresar no es válida!");
      return;
    }
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const m = hoy.getMonth() - (parseInt(mes) - 1);
    if (m < 0 || (m === 0 && hoy.getDate() < parseInt(dia))) {
      edad--;
    }

    if (edad < 18) {
      setErrorFecha("Debes tener al menos 18 años"); 
    }else {
    setErrorFecha("");
    }
  }
};

  const handlePassword2 = (e) =>{
    const valor = e.target.value;
    setClave2(valor)
    setErrorClaves(clave1==valor?'':'Error, las claves no coinciden!')
  }

  const handlePassword1 = (e) =>{
    const valor = e.target.value;
    setClave1(valor)
    setErrorClaves(clave2==valor?'':'Error, las claves no coinciden!')
    
  }
  const handleReset = () => {
    setNombre('');
    setErrorNombre('')
    setEmail('');
    setErrorEmail('')
    setClave1('');
    setClave2('');
    setErrorClaves('')
    setFechaNacimiento('');
    setErrorFecha('');
    setErrorSubmit('')
};
  useEffect(() => {
  if (!errorNombre && !errorEmail && !errorFecha && !errorClaves) {
    setErrorSubmit('');
  }
}, [errorNombre, errorEmail, errorFecha, errorClaves]);

  const handleSubmit = (e) =>{
    let hayError = false;

  if (nombre.length < 3) {
    setErrorNombre('El nombre debe contener 3 caracteres como minimo!');
    hayError = true;
  }

  if (!email.includes('@')) {
    setErrorEmail('El email debe contener @!');
    hayError = true;
  }

   if (!fechaNacimiento) {
    setErrorFecha('Error, debes ingresar una fecha');
    hayError = true;
  } else {
    const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
    if (!regex.test(fechaNacimiento)) {
      setErrorFecha('Formato inválido (usa DD-MM-YYYY)');
      hayError = true;
    } else {
      const [_, dia, mes, año] = fechaNacimiento.match(regex);
      const fechaNac = new Date(`${año}-${mes}-${dia}`);
      const hoy = new Date();

      if (
        isNaN(fechaNac.getTime()) ||
        parseInt(dia) > 31 ||
        parseInt(mes) > 12 ||
        parseInt(año) > hoy.getFullYear() ||
        parseInt(año) < hoy.getFullYear() - 120
      ) {
        setErrorFecha('La fecha que intentas ingresar no es válida!');
        hayError = true;
      } else {
        let edad = hoy.getFullYear() - fechaNac.getFullYear();
        const m = hoy.getMonth() - (parseInt(mes) - 1);
        if (m < 0 || (m === 0 && hoy.getDate() < parseInt(dia))) {
          edad--;
        }
        if (edad < 18) {
          setErrorFecha('Debes tener al menos 18 años');
          hayError = true;
        } else {
          setErrorFecha('');
        }
      }
    }
  }

  if(!clave1 || !clave2) {
    setErrorClaves('Debes ingresar una clave!');
    hayError = true;
  }else if  (clave1 !== clave2) {
    setErrorClaves('Error, las claves no coinciden!');
    hayError = true;
  }

  if (hayError) {
    e.preventDefault();
    setErrorSubmit('Error, faltan campos por corregir!'); 
  } else {
    setTimeout(() => setErrorSubmit(''), 0);  
    setErrorSubmit('');
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
                className={errorNombre?'error':''}
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
                className={errorEmail?'error':''}
              />
          </div>
          <div className="row">
              <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
              <input type="text" id="fechaNacimiento" placeholder="DD-MM-YYYY"
                value={fechaNacimiento} onChange={handleFechaChange}
                className={errorFecha?'error':''}
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
                className={errorClaves?'error':''}
              />
          </div>
          <div className="row">
              <label htmlFor="clave2">Confirmar contraseña:</label>
              <input type="password" id="clave2"
              value={clave2} onChange={handlePassword2}
              className={errorClaves?'error':''}  
              />
          </div>
          <p id="errores">{mostrarError}</p>
          <div className="button-container">
            <button type="reset" onClick={handleReset}>Limpiar</button>
            <button type="submit" onClick={handleSubmit}>Registrarme</button>  
          </div>
      </form>
    </div>
  </>
  )
}
