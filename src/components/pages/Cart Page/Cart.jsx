import React from 'react'
import './Cart.css'
import TopBar from '../../organisms/Top Bar/TopBar'
export default function Cart() {
    const products = JSON.parse(localStorage.getItem('products')) || []
  return (
    <>
        <TopBar/>
        <div className="cart">
            <h2>Carrito de compras</h2>
            {products.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <div className="cart-items">
                    {products.map((p, i) => (
                        <div key={i} className="cart-item">
                        <div className="product-cart-image"
                            style={{ backgroundImage: `url(${p.image})` }}>
                        </div>
                        <div className="cart-info">
                        <p className="cart-name">{p.name}</p>
                        <p className="cart-description">{p.description}</p>
                        <p className="cart-price">{p.price}</p>
                        </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </>
  )
}
