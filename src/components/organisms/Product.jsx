import React from 'react'

export default function Product(props) {
    const {code,image,name,description,price} = props
  return (
    <div className="product">
        <div className="product-image" style={{backgroundImage: `url(${image})`}}></div>
        <div className="product-name">{name}</div>
        <div className="product-description">{description}</div>
        <div className="product-price">{price}</div>
        <button onClick={()=>addToCart(props)} style={{ backgroundColor: '#1E90FF', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>
          Añadir al carro
        </button>
    </div>
  )
}

function addToCart(product){
    const products = JSON.parse(localStorage.getItem('products')) || []
    products.push(product)
    localStorage.setItem("products",JSON.stringify(products))
}