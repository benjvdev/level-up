import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./DetalleProducto.css";
import TopBar from "../../organisms/Top Bar/TopBar";
import CategoryMenu from "../../organisms/Category Menu/CategoryMenu";
import Price from "../../atoms/Price/Price";

export default function DetalleProducto() {
  const { id } = useParams(); 
  
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:8080/productos/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('producto no encontrado');
          }
          throw new Error('no se pudo cargar el producto');
        }
        const data = await response.json(); 

        // comprobamos si el producto está disponible
        if (data.disponible === false) {
          //si no lo está, lo tratamos como si no se hubiera encontrado
          throw new Error('producto no encontrado');
        }
        const transformedProduct = {
          code: data.id_producto,
          name: data.nombre,
          description: data.descripcion,
          price: data.precio,
          category: data.categoria,
          image: data.image,
          id_producto: data.id_producto
        };
        setProduct(transformedProduct);

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]); 

  if (isLoading) {
    return (
      <>
        <TopBar />
        <CategoryMenu />
        <div className="detalle-container">
          <h2>Cargando producto...</h2>
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <TopBar />
        <CategoryMenu />
        <div className="detalle-container">
          <h2>{error ? error : 'Producto no encontrado'}</h2>
          <Link to="/">Volver al inicio</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar />
      <CategoryMenu />
      <div className="detalle-container">
        <div className="detalle-card">
          <div
            className="detalle-image"
            style={{ backgroundImage: `url(${product.image})` }}
          ></div>
          <div className="detalle-info">
            <h1>{product.name}</h1>
            <p className="detalle-description">{product.description}</p>
            <Price amount={product.price} className="detalle-price" />
            <button onClick={() => addToCart(product)}>Añadir al carro</button>
            <Link to={`/categories/${product.category.replace(/ /g, "-")}`}>
              <p className="detalle-category">
                Ver más en {product.category}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function addToCart(product) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
}