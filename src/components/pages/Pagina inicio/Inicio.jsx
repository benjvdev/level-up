import React, { useState, useEffect } from 'react';
import TopBar from '../../organisms/Top Bar/TopBar';
import Product from '../../organisms/Product/Product';
import './Inicio.css';
import CategoryMenu from '../../organisms/Category Menu/CategoryMenu';
import { processProductsForFrontend } from '../../../utils/processPeoductsForFrontend';

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
        
        //usamos la función utilitaria para procesar los productos
        const finalProducts = processProductsForFrontend(data);
        setProducts(finalProducts);

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
      // usamos 'p.code' que es el id para el key
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