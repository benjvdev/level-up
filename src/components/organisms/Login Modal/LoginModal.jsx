import React, { useState } from 'react';
import './LoginModal.css';
import { useAuth } from '../../../context/AuthContext';


export default function LoginModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth(); //función login del contexto

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!email || !password) {
      setError('Por favor, ingresa email y contraseña.');
      setIsLoading(false);
      return;
    }

    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form id="login-modal" onSubmit={handleSubmit}>
      <h1>Iniciar sesión</h1>
      <input
        type="text"
        id="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        id="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="error-text">{error}</p>}
      <p style={{ color: '#5badffff', fontSize: '.9rem' }}>
        Aun no tienes cuenta? Registrate{' '}
        <a href="/Register" style={{ color: '#5badffff', fontSize: '.9rem' }}>
          aquí
        </a>
      </p>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Iniciando...' : 'Iniciar sesión'}
      </button>
    </form>
  );
}
