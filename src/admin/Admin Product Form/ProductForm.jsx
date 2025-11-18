import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

  // leemos el 'id' de la url. si existe, estamos en modo edicion
  const { id } = useParams();
  const isEditMode = !!id; // esto sera true si 'id' existe

  useEffect(() => {
    // si estamos en modo edicion (hay un id), cargamos los datos
    if (isEditMode) {
      setIsLoading(true);
      const fetchProductData = async () => {
        try {
          // usamos el endpoint publico para obtener los datos
          const response = await fetch(`http://localhost:8080/productos/${id}`);
          if (!response.ok) {
            throw new Error('no se pudo cargar el producto para editar');
          }
          const productData = await response.json();
          
          // rellenamos el formulario con los datos del backend
          setFormData({
            nombre: productData.nombre,
            descripcion: productData.descripcion,
            precio: productData.precio.toString(), // convertimos a string para el input
            image: productData.image,
            categoria: productData.categoria,
            disponible: productData.disponible // esto actualizara el checkbox
          });

        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProductData();
    }
    // este efecto depende solo del 'id' de la url
  }, [id, isEditMode]);


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
        precio: parseFloat(formData.precio), // el backend espera un numero
      };

      // decidimos el metodo y la url segun el modo
      const method = isEditMode ? 'PUT' : 'POST';
      const url = isEditMode 
        ? `http://localhost:8080/admin/productos/${id}` // url para actualizar
        : 'http://localhost:8080/admin/productos'; // url para crear

      const response = await fetch(url, {
        method: method, // POST (crear) o PUT (actualizar)
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        const errorMessage = isEditMode ? 'Error al actualizar el producto' : 'Error al crear el producto';
        throw new Error(errorText || errorMessage);
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
        
        <h1>{isEditMode ? 'Editar Producto' : 'Añadir Nuevo Producto'}</h1>
        
        <button onClick={() => navigate('/admin/products')} className="product-form-back-btn">
          &larr; Volver a la lista
        </button>
      </div>
      
      {error && <div className="product-form-error">{error}</div>}

      
      {isLoading && isEditMode ? (
        <p style={{ textAlign: 'center', padding: '2rem' }}>cargando datos del producto...</p>
      ) : (
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
                  checked={formData.disponible} // se actualiza desde el estado
                  onChange={handleChange}
                />
                <label htmlFor="disponible">Disponible para la venta</label>
              </div>
            </div>
          </div>

          <div className="form-actions">
            
            <button type="submit" className="form-submit-btn" disabled={isLoading}>
              {isLoading ? 'Guardando...' : (isEditMode ? 'Actualizar Producto' : 'Guardar Producto')}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}