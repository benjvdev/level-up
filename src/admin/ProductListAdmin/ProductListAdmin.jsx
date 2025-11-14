import React, { useState, useEffect } from 'react';
import './ProductListAdmin.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'; 
import Price from '../../components/atoms/Price/Price';

export default function ProductListAdmin() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth(); 
  const navigate = useNavigate(); 

  // función para cargar los productos 
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/productos');
      if (!response.ok) {
        throw new Error('No se pudieron cargar los productos');
      }
      const data = await response.json();
      
      setProducts(Array.isArray(data) ? data : []);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  //cargar productos cuando el componente se monta
  useEffect(() => {
    fetchProducts();
  }, []);

  // función de eliminación 
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setError(null); 

      if (!token) {
        setError('no estas autenticado. por favor, inicia sesión de nuevo.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/admin/productos/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Error al eliminar el producto');
        }
        fetchProducts(); 
      } catch (err) {
        console.error("error al eliminar:", err);
        setError(err.message);
      }
    }
  };

  // función de edición (sin cambios)
  const handleEdit = (id) => {
    console.log('Editar producto con id:', id);
    // navigate(`/admin/products/edit/${id}`);
  };

  if (isLoading) return <div className="admin-loading">Cargando productos...</div>;

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h1>Gestión de Productos</h1>
        
        <button 
          className="admin-add-button"
          onClick={() => navigate('/admin/products/new')} 
        >
          Añadir Producto
        </button>
      </div>

      {error && <div className="admin-error global-error">Error: {error}</div>}

      {products.length === 0 && !isLoading ? (
        <div className="admin-empty-state">
          <h2>No hay productos</h2>
          <p>Aún no has añadido ningún producto. ¡Empieza haciendo clic en "Añadir Producto"!</p>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id_producto}>
                <td>{product.id_producto}</td>
                <td>
                  <img 
                    src={product.image} 
                    alt={product.nombre} 
                    className="admin-table-img" 
                    onError={(e) => e.target.src = 'https://placehold.co/60x60?text=Error'}
                  />
                </td>
                <td data-label="Nombre">{product.nombre}</td>
                <td data-label="Precio">
                  <Price amount={product.precio} />
                </td>
                
                <td data-label="Categoría">{product.categoria}</td>
                <td data-label="Acciones">
                  <button 
                    className="admin-action-button edit"
                    onClick={() => handleEdit(product.id_producto)}
                  >
                    Editar
                  </button>
                  <button 
                    className="admin-action-button delete"
                    onClick={() => handleDelete(product.id_producto)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}