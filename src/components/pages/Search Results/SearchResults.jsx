import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TopBar from '../../organisms/Top Bar/TopBar';
import CategoryMenu from '../../organisms/Category Menu/CategoryMenu';
import Product from '../../organisms/Product/Product';
import { processProductsForFrontend } from '../../../utils/processPeoductsForFrontend';
import './SearchResults.css';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query'); // obtenemos el texto de búsqueda de la URL

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return; // si no hay query, no hacemos nada
      setIsLoading(true);
      setError(null);
      
      try {
        // llamamos al endpoint de búsqueda 
        const response = await fetch(`http://localhost:8080/productos/search?query=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
          throw new Error('error al realizar la búsqueda');
        }
        
        const data = await response.json();
        
        // usamos el helper para filtrar disponibles y transformar datos
        const processedProducts = processProductsForFrontend(data);
        
        setProducts(processedProducts);

      } catch (err) {
        console.error("Error buscando productos:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]); // se ejecuta cada vez que cambia la query en la URL

  // renderizado del contenido principal
  const renderContent = () => {
    if (isLoading) {
      return <div className="search-message">buscando productos...</div>;
    }

    if (error) {
      return <div className="search-message error">error: {error}</div>;
    }

    if (products.length === 0) {
      return (
        <div className="search-message">
          <p>no se encontraron resultados para "{query}".</p>
          <p className="search-hint">intenta con otras palabras clave o categorías.</p>
        </div>
      );
    }

    return (
      <div className="search-results-grid">
        {products.map((product) => (
          <Product key={product.code} {...product} />
        ))}
      </div>
    );
  };

  return (
    <>
      <TopBar />
      <CategoryMenu />
      
      <div className="search-results-page">
        <h1 className="search-title">
          Resultados para: <span className="highlight">"{query}"</span>
        </h1>
        
        {renderContent()}
      </div>
    </>
  );
}