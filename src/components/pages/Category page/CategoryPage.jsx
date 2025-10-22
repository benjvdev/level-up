import React from "react";
import { useParams } from "react-router-dom";
import "./CategoryPage.css";
import Product from "../../organisms/Product/Product";
import TopBar from "../../organisms/Top Bar/TopBar";
import CategoryMenu from "../../organisms/Category Menu/CategoryMenu";

export default function CategoryPage() {
  const { categoryName } = useParams();

  
  const allProducts = [
    {
      code: "1",
      image: "https://devirinvestments.s3.eu-west-1.amazonaws.com/img/catalog/product/8436017220100-1200-face3d.jpg",
      name: "Catan",
      description: "En familia o con amigos, Catan es el juego de mesa imprescindible...",
      price: "$29.990",
      category: "juegos de mesa"
    },
    {
      code: "2",
      image: "https://devirinvestments.s3.eu-west-1.amazonaws.com/img/catalog/product/8436017222593-1200-face3d-copy.jpg",
      name: "Carcassonne",
      description: "Un juego de colocación de fichas...",
      price: "$24.990",
      category: "juegos de mesa"
    },
    {
      code: "3",
      image: "https://cdnx.jumpseller.com/notebook-store/image/64988646/resize/540/540?1751055230",
      name: "Controlador Inalámbrico Xbox Series X",
      description: "Ofrece una experiencia de juego cómoda...",
      price: "$49.990",
      category: "gaming y streaming"
    },
    {
      code: "4",
      image: "https://media.spdigital.cl/thumbnails/products/tlq8deac_54de6536_thumbnail_512.jpg",
      name: "Auriculares Gamer HyperX Cloud II",
      description: "Proporcionan un sonido envolvente de calidad...",
      price: "$64.990",
      category: "gaming y streaming"
    },
    {
      code: "5",
      image: "https://media.falabella.com/falabellaCL/141344101_01/w=1500,h=1500,fit=pad",
      name: "Playstation 5",
      description: "La consola de última generación de Sony...",
      price: "$689.990",
      category: "consolas"
    },
    {
      code: "6",
      image: "https://media.falabella.com/falabellaCL/148061408_01/w=1500,h=1500,fit=pad",
      name: "PC Gamer ASUS ROG Strix",
      description: "Un potente equipo diseñado para gamers exigentes...",
      price: "$2.289.990",
      category: "computacion"
    },
    {
      code: "7",
      image: "https://http2.mlstatic.com/D_Q_NP_746242-MLA49725399018_042022-O.webp",
      name: "Silla Gamer Secretlab Titan",
      description: "Diseñada para el máximo confort...",
      price: "$189.990",
      category: "gaming y streaming"
    },
  ];

  const normalizedCategory = categoryName.replace(/-/g, " ").toLowerCase();
  const filteredProducts = allProducts.filter(
    (p) => p.category.toLowerCase() === normalizedCategory
  );

  return (
    <>  
        <TopBar/>
        <CategoryMenu/>
        <div className="category-page">
            <h1 className="category-title">{categoryName.replace(/-/g, " ")}</h1>
            <div className="category-products">
                {filteredProducts.length === 0 ? (
                    <p>No hay productos disponibles en esta categoría.</p>
                ) : (
                    filteredProducts.map((product) => (
                    <Product key={product.code} {...product} />
                    ))
                )}
            </div>
        </div>
    </>
  );
}