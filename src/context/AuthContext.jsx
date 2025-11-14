import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
const API_URL = 'http://localhost:8080/usuarios/login';
//creacion de contexto
const AuthContext = createContext(null);

//componente que provee el contexto
export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('authToken')); // estado para el token
  const [isLoading, setIsLoading] = useState(true); 

  //cargar la sesión desde localStorage al iniciar
  useEffect(() => {
    setIsLoading(true); 
    try {
      const storedUserData = localStorage.getItem('userData');
      const storedToken = localStorage.getItem('authToken');

      if (storedUserData && storedToken) {
        setUser(JSON.parse(storedUserData));
        setToken(storedToken);
      } else {
        localStorage.removeItem('userData');
        localStorage.removeItem('authToken');
      }
    } catch (error) {
      console.error("error al cargar datos de sesión:", error);
      localStorage.removeItem('userData');
      localStorage.removeItem('authToken');
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
      
        const data = await response.json(); 
  
        if (!data.token || !data.user) { // Comprobamos ambas claves
          throw new Error('respuesta inválida del servidor (falta token o user)');
        }

        //extraemos las dos partes
        const authToken = data.token;
        const userData = data.user;
        
        //guardamos las partes correctas
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('authToken', authToken);
        
        //actualizamos el estado global
        setUser(userData);
        setToken(authToken); 

        //devolvemos solo los datos del usuario (el objeto anidado)
        return userData; 

      } else {
        const errorData = await response.json();
        const message = errorData.message || 'Credenciales incorrectas.';
        throw new Error(message);
      }
    } catch (err) {
      console.error("error en el login:", err);
      throw err;
    }
  };

  //funcion de logout
  const logout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken'); 
    setUser(null); 
    setToken(null); 
  };
  
  //valor del contexto
  const value = useMemo(
    () => ({
      user,
      isLoading, 
      token, //proveemos el token
      login,
      logout,
    }),
    [user, isLoading, token] //dependencias
  );

  //retornar el proveedor
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// hook personalizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};