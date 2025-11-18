import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './ProductCarousel.css';
import Price from '../../atoms/Price/Price'; 
import { processProductsForFrontend } from '../../../utils/processPeoductsForFrontend';

export default function ProductCarousel() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/productos');
        if (response.ok) {
          const data = await response.json();
          
          const processed = processProductsForFrontend(data);

          setProducts(processed.slice(0, 5)); 
        }
      } catch (error) {
        console.error("Error cargando carrusel:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  //navegación
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  }, [products.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  //auto-play
  useEffect(() => {
    if (products.length === 0) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);

    return () => clearInterval(interval);
  }, [nextSlide, products.length]);

  if (isLoading || products.length === 0) return null; 

  return (
    <div className="carousel-container">
      
      <button className="carousel-btn prev" onClick={prevSlide}>&#10094;</button>
      
      <div 
        className="carousel-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {products.map((product) => (
          <div 
            className="carousel-slide" 
            key={product.code}
            style={{ backgroundImage: `url(${product.image})` }}
          >
            <div className="carousel-content">
              <h2 className="carousel-title">{product.name}</h2>
              <p className="carousel-desc">{product.description}</p>
              <div className="carousel-footer">
                <Price amount={product.price} className="carousel-price" />
                <Link to={`/product/${product.code}`} className="carousel-link">
                  Ver detalles
                </Link>
              </div>
            </div>
            <div className="carousel-overlay"></div>
          </div>
        ))}
      </div>

      <button className="carousel-btn next" onClick={nextSlide}>&#10095;</button>

      <div className="carousel-indicators">
        {products.map((_, index) => (
          <span 
            key={index} 
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}