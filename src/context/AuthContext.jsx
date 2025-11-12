import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
const API_URL = 'http://localhost:8080/usuarios/login';
//creacion de contexto
const AuthContext = createContext(null);

//componente que provee el contexto
export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  // cargar la sesión desde localStorage al iniciar
  useEffect(() => {
    setIsLoading(true); 
    try {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        setUser(JSON.parse(storedUserData));
      }
    } catch (error) {
      console.error("Error al cargar datos de sesión:", error);
      localStorage.removeItem('userData');
    } finally {
      setIsLoading(false); 
    }
  }, []);//se ejecuta solo una vez al montar

  //funcion de login
  const login = async (email, password) => {

    const payload = { email, password };
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData); //actualiza el estado global
        return userData;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Credenciales incorrectas.');
      }
    } catch (err) {
      console.error("Error en el login:", err);
      throw err;
    }
  };
  //funcion de Logout
  const logout = () => {
    localStorage.removeItem('userData');
    setUser(null); //actualiza el estado global
  };
  
  //valor del contexto
  const value = useMemo(
    () => ({
      user,
      isLoading, 
      login,
      logout,
    }),
    [user, isLoading] 
  );

  //retornar el proveedor
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 8. hook personalizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};