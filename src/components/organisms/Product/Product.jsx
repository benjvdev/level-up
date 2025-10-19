import React from 'react'
import './Product.css'
export default function Product(props) {
    const {code,image,name,description,price,category} = props
  return (
    <div className="product">
        <div className="product-image" style={{backgroundImage: `url(${image})`}}></div>
        <div className="product-name">{name}</div>
        <div className="product-price">{price}</div>
        <button onClick={()=>addToCart(props)}>Añadir al carro</button>
    </div>
  )
}

function addToCart(product){
    const products = JSON.parse(localStorage.getItem('products')) || []
    products.push(product)
    localStorage.setItem("products",JSON.stringify(products))
}