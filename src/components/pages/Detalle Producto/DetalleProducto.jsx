import React from "react";
import { useParams, Link } from "react-router-dom";
import "./DetalleProducto.css";
import allProducts from '../../../data/products.json'
import TopBar from "../../organisms/Top Bar/TopBar";
import CategoryMenu from "../../organisms/Category Menu/CategoryMenu";

export default function DetalleProducto() {
  const { productCode } = useParams();

  const product = allProducts.find((p) => p.code === productCode.trim());

  if (!product) {
    return (
      <>
        <TopBar />
        <CategoryMenu />
        <div className="detalle-container">
          <h2>Producto no encontrado</h2>
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
            <p className="detalle-price">{product.price}</p>
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