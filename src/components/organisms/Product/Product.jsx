import React from 'react'
import './Product.css'
import { Link } from 'react-router-dom';
import Price from '../../atoms/Price/Price';
 

export default function Product(props) {
    const {code,image,name,description,price,category} = props
  return (
    <Link to={`/product/${code}`} className="product-link">
      <div className="product">
        <div
          className="product-image"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="product-name">{name}</div>

        <Price amount={price} className="product-price" />

        <button
          onClick={(e) => {
            e.preventDefault(); 
            addToCart(props);
          }}
        >
          Añadir al carro
        </button>
      </div>
    </Link>
  );
}

function addToCart(product){
    const products = JSON.parse(localStorage.getItem('products')) || []
    products.push(product)
    localStorage.setItem("products",JSON.stringify(products))
}