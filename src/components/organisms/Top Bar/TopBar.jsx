import React, {useEffect, useRef, useState} from 'react'
import SearchBar from '../../atoms/Search Bar/SearchBar'
import Logo from '../../atoms/Logo/Logo'
import BotonCarrito from '../../atoms/Boton Carrito/BotonCarrito'
import LoginModal from '../Login Modal/LoginModal';
import './TopBar.css'
import { Navigate} from 'react-router-dom';
import { createPortal } from 'react-dom';

export default function TopBar() {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }
    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showModal]);

  return (
    <>
    <div id='topbar-container'>
      <Logo
      onClick={() =>{
        Navigate('/');
        }}/>

      <SearchBar/>
      <p id='inicio-sesion'> Inicia sesión <a href='#'
        style={{color: "white",textDecoration: "none"}}
        onClick={(e) =>{
          e.preventDefault();
          setShowModal(true)
        }}
        >aquí</a>
      </p>
      {showModal && createPortal(
        <div ref={modalRef}> 
          <LoginModal/>
        </div>,
        document.body
      )}
      <BotonCarrito/>
      </div>
    </>
  )
}
