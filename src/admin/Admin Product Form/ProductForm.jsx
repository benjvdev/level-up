import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductForm.css';
import { useAuth } from '../../context/AuthContext';

export default function ProductForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    image: '',
    categoria: '',
    disponible: true, //nuevos productos están disponibles por defecto
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth(); //obtenemos el token del contexto

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    //comprobación de seguridad
    if (!token) {
      setError('no estas autenticado. por favor, inicia sesión de nuevo.');
      setIsLoading(false);
      return;
    }

    try {
      // payload para el backend
      const payload = {
        ...formData,
        precio: parseFloat(formData.precio),
      };

      const response = await fetch('http://localhost:8080/admin/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          //añadimos el token jwt a la cabecera 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();// capturamos el error del backend si existe
        throw new Error(errorText || 'Error al crear el producto');
      }
      //si todo sale bien, volvemos a la lista de productos
      navigate('/admin/products');
    } catch (err) {
      console.error("error en el fetch:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-form-container">
      <div className="product-form-header">
        <h1>Añadir Nuevo Producto</h1>
        <button onClick={() => navigate('/admin/products')} className="product-form-back-btn">
          &larr; Volver a la lista
        </button>
      </div>
      
      {error && <div className="product-form-error">{error}</div>}

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          
          <div className="form-column">
            <div className="form-group">
              <label htmlFor="nombre">Nombre del Producto</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="precio">Precio (CLP)</label>
              <input
                type="number"
                id="precio"
                name="precio"
                step="0.01" 
                min="0"
                value={formData.precio}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="categoria">Categoría</label>
              <input
                type="text"
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-column">
            <div className="form-group">
              <label htmlFor="image">URL de la Imagen</label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://ejemplo.com/imagen.jpg"
                required
              />
            </div>

            <div className="form-group form-group-textarea">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                rows="6"
                value={formData.descripcion}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-group-checkbox">
              <input
                type="checkbox"
                id="disponible"
                name="disponible"
                checked={formData.disponible}
                onChange={handleChange}
              />
              <label htmlFor="disponible">Disponible para la venta</label>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="form-submit-btn" disabled={isLoading}>
            {isLoading ? 'Guardando...' : 'Guardar Producto'}
          </button>
        </div>
      </form>
    </div>
  );
}