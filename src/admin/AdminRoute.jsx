import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export default function AdminRoute() {
  // datos del contexto
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando...</div>; 
  }

  // comprobación de rol
  const esAdmin = user && user.rol && user.rol.trim().toUpperCase() === 'ADMIN';

  if (!user || !esAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}