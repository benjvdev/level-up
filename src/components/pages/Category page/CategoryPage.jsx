import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CategoryPage.css";
import Product from "../../organisms/Product/Product";
import TopBar from "../../organisms/Top Bar/TopBar";
import CategoryMenu from "../../organisms/Category Menu/CategoryMenu";
import { processProductsForFrontend } from "../../../utils/processPeoductsForFrontend";

export default function CategoryPage() {
  const { categoryName } = useParams();
  
  //estados para manejar los productos, la carga y los errores
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //useEffect para cargar y filtrar datos cuando 'categoryName' cambia
  useEffect(() => {
    const fetchAndFilterProducts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        //traemos los productos del backend
        const response = await fetch('http://localhost:8080/productos');
        if (!response.ok) {
          throw new Error('no se pudieron cargar los productos');
        }
        const data = await response.json();
        //funcion utilitaria para procesar productos
        const processedProducts = processProductsForFrontend(data);
        //aplicamos la lógica de filtro que ya tenías
        const normalizedCategory = categoryName.replace(/-/g, " ").toLowerCase();
        const categoryFilteredProducts = processedProducts.filter(
          (p) => p.category.toLowerCase() === normalizedCategory
        );

        setFilteredProducts(categoryFilteredProducts);

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndFilterProducts();
  }, [categoryName]); // se ejecuta cada vez que la categoría en la url cambia

  //función de renderizado condicional
  const renderProducts = () => {
    if (isLoading) {
      return <p style={{ textAlign: 'center', padding: '2rem' }}>cargando productos...</p>;
    }
    
    if (error) {
      return <p style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>error: {error}</p>;
    }
    if (filteredProducts.length === 0) {
      return <p>no hay productos disponibles en esta categoría.</p>;
    }

    return filteredProducts.map((product) => (
      <Product key={product.code} {...product} />
    ));
  };

  return (
    <>  
      <TopBar/>
      <CategoryMenu/>
      <div className="category-page">
        <h1 className="category-title">{categoryName.replace(/-/g, " ")}</h1>
        <div className="category-products">
          
          {renderProducts()}
        </div>
      </div>
    </>
  );
}