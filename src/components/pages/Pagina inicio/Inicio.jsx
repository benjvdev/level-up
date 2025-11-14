import React, { useState, useEffect } from 'react';
import TopBar from '../../organisms/Top Bar/TopBar';
import Product from '../../organisms/Product/Product';
import './Inicio.css';
import CategoryMenu from '../../organisms/Category Menu/CategoryMenu';

export default function Inicio() {
  
  // estados para manejar los productos, la carga y los errores
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //useEffect para cargar los datos del backend cuando el componente se monta
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/productos');
        if (!response.ok) {
          throw new Error('no se pudieron cargar los productos');
        }
        const data = await response.json();

        //transformamos los datos del backend al formato que el Product.jsx espera
        const transformedData = data.map(product => ({
          code: product.id_producto,
          name: product.nombre,
          description: product.descripcion,
          price: product.precio,
          category: product.categoria,
          image: product.image,
          id_producto: product.id_producto 
        }));
        
        setProducts(transformedData);

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []); // el array vacío asegura que se ejecute solo una vez

  //renderizado condicional mientras se carga o si hay error
  const renderProducts = () => {
    if (isLoading) {
      return <p style={{ textAlign: 'center', padding: '2rem' }}>cargando productos...</p>;
    }
    if (error) {
      return <p style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>error: {error}</p>;
    }
    if (products.length === 0) {
      return <p style={{ textAlign: 'center', padding: '2rem' }}>no hay productos disponibles.</p>;
    }

    return products.map((p) => (
      // usamos 'p.code' que ahora es el id para el key
      <Product key={p.code} {...p} />
    ));
  };

  return (
    <>
      <TopBar/> 
      <CategoryMenu/>
      <div id="products">
        {renderProducts()}
      </div>    
    </>
  );
}