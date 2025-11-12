import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './AdminPage.css';
import { useAuth } from '../../context/AuthContext';


export default function AdminPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  return (
    <div className="admin-layout">
      
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h3>Panel de Admin</h3>
          <span>Bienvenido, {user?.nombreUsuario}</span>
        </div>
        <nav className="admin-nav">
          <NavLink 
            to="/admin/products" 
            className={({ isActive }) => isActive ? 'admin-nav-link active' : 'admin-nav-link'}
          >
            Gestionar Productos
          </NavLink>

        </nav>
        <div className="admin-sidebar-footer">
          <button onClick={handleLogout} className="admin-logout-button">
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="admin-content">
        
        <Outlet />
      </main>
    </div>
  );
}