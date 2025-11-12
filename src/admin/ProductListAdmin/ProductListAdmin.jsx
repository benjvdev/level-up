import React, { useState, useEffect } from 'react';
import './ProductListAdmin.css';
import { useAuth } from '../../context/AuthContext';

export default function ProductListAdmin() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // (Opcional) Para el token si es necesario

  // Función para cargar los productos
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/productos');
      if (!response.ok) {
        throw new Error('No se pudieron cargar los productos');
      }
      const data = await response.json();
      
      // --- 1. CORRECCIÓN IMPORTANTE ---
      // Asegurarnos de que 'data' sea un array. Si la API devuelve null o undefined,
      // lo convertimos a un array vacío [] para evitar el crash.
      setProducts(Array.isArray(data) ? data : []);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar productos cuando el componente se monta
  useEffect(() => {
    fetchProducts();
  }, []);

  // Función de Borrado (a implementar)
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      console.log('Eliminar producto con id:', id);
      // TODO: Implementar llamada a API DELETE /admin/productos/{id}
    }
  };

  // Función de Edición (a implementar)
  const handleEdit = (id) => {
    console.log('Editar producto con id:', id);
    // TODO: Implementar redirección
  };

  if (isLoading) return <div className="admin-loading">Cargando productos...</div>;
  if (error) return <div className="admin-error">Error: {error}</div>;

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h1>Gestión de Productos</h1>
        <button className="admin-add-button">Añadir Producto</button>
      </div>

      {/* --- 2. NUEVA SECCIÓN --- */}
      {/* Comprobamos si, después de cargar, la lista de productos está vacía */}
      {products.length === 0 ? (
        <div className="admin-empty-state">
          <h2>No hay productos</h2>
          <p>Aún no has añadido ningún producto. ¡Empieza haciendo clic en "Añadir Producto"!</p>
        </div>
      ) : (
        /* Si hay productos, mostramos la tabla */
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
                {/* Añadimos '?' (optional chaining) por si 'precio' 
                  alguna vez es nulo. Esto evita un crash.
                */}
                <td data-label="Precio">${product.precio?.toLocaleString('es-CL') || 'N/A'}</td>
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