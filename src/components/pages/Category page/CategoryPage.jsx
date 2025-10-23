import React from "react";
import { useParams } from "react-router-dom";
import "./CategoryPage.css";
import allProducts from '../../../data/products.json'
import Product from "../../organisms/Product/Product";
import TopBar from "../../organisms/Top Bar/TopBar";
import CategoryMenu from "../../organisms/Category Menu/CategoryMenu";

export default function CategoryPage() {
  const { categoryName } = useParams();

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