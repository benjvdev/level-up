import React from "react";
import { useParams, Link } from "react-router-dom";
import "./DetalleProducto.css";
import TopBar from "../../organisms/Top Bar/TopBar";
import CategoryMenu from "../../organisms/Category Menu/CategoryMenu";

export default function DetalleProducto() {
  const { productCode } = useParams();

  const allProducts = [
    {
      code: "1",
      image: "https://devirinvestments.s3.eu-west-1.amazonaws.com/img/catalog/product/8436017220100-1200-face3d.jpg",
      name: "Catan",
      description:
        "En familia o con amigos, Catan es el juego de mesa imprescindible para todos los hogares. Con reglas rápidas de aprender y fáciles de explicar.",
      price: "$29.990",
      category: "juegos de mesa",
    },
    {
      code: "2",
      image: "https://devirinvestments.s3.eu-west-1.amazonaws.com/img/catalog/product/8436017222593-1200-face3d-copy.jpg",
      name: "Carcassonne",
      description:
        "Un juego de colocación de fichas donde los jugadores construyen el paisaje alrededor de la fortaleza medieval de Carcassonne. Ideal para 2-5 jugadores y fácil de aprender.",
      price: "$24.990",
      category: "juegos de mesa",
    },
    {
      code: "3",
      image:
        "https://cdnx.jumpseller.com/notebook-store/image/64988646/resize/540/540?1751055230",
      name: "Controlador Inalámbrico Xbox Series X",
      description:
        "Ofrece una experiencia de juego cómoda con botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC.",
      price: "$49.990",
      category: "gaming y streaming",
    },
    {
      code: "4",
      image:
        "https://media.spdigital.cl/thumbnails/products/tlq8deac_54de6536_thumbnail_512.jpg",
      name: "Auriculares Gamer HyperX Cloud II",
      description:
        "Proporcionan un sonido envolvente de calidad con un micrófono desmontable y almohadillas de espuma viscoelástica para mayor comodidad durante largas sesiones de juego.",
      price: "$64.990",
      category: "gaming y streaming",
    },
    {
      code: "5",
      image:
        "https://media.falabella.com/falabellaCL/141344101_01/w=1500,h=1500,fit=pad",
      name: "Playstation 5",
      description:
        "La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva.",
      price: "$689.990",
      category: "consolas",
    },
    {
      code: "6",
      image:
        "https://media.falabella.com/falabellaCL/148061408_01/w=1500,h=1500,fit=pad",
      name: "PC Gamer ASUS ROG Strix",
      description:
        "Un potente equipo diseñado para los gamers más exigentes, equipado con los últimos componentes para ofrecer un rendimiento excepcional en cualquier juego.",
      price: "$2.289.990",
      category: "computacion",
    },
    {
      code: "7",
      image:
        "https://http2.mlstatic.com/D_Q_NP_746242-MLA49725399018_042022-O.webp",
      name: "Silla Gamer Secretlab Titan",
      description:
        "Diseñada para el máximo confort, esta silla ofrece un soporte ergonómico y personalización ajustable para sesiones de juego prolongadas.",
      price: "$189.990",
      category: "gaming y streaming",
    },
  ];

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