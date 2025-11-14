import React, { useState } from 'react'
import './Cart.css'
import TopBar from '../../organisms/Top Bar/TopBar'
import Price from '../../atoms/Price/Price'; 

export default function Cart() {
    const [products, setProducts] = useState(
        JSON.parse(localStorage.getItem('products')) || []
    );

    const updateCart = (newProducts) => {
        setProducts(newProducts);
        localStorage.setItem('products', JSON.stringify(newProducts));
    };

    const groupedProducts = Object.values(
        products.reduce((acc, product) => {
            const code = product.code || product.id;
            if (!acc[code]) {
                acc[code] = { ...product, quantity: product.quantity || 1 };
            } else {
                acc[code].quantity += product.quantity || 1;
            }
            return acc;
        }, {})
    );

    const increaseQuantity = (code) => {
        const newProducts = [...products, products.find(p => p.code === code)];
        updateCart(newProducts);
    };

    const decreaseQuantity = (code) => {
        const indexToRemove = products.findIndex(p => p.code === code);
        if (indexToRemove !== -1) {
            const newProducts = [...products];
            newProducts.splice(indexToRemove, 1);
            updateCart(newProducts);
        }
    };

    const removeFromCart = (code) => {
        const newProducts = products.filter(p => p.code !== code);
        updateCart(newProducts);
    };

    return (
        <>
            <TopBar/>
            <div className="cart">
                <h2>Carrito de compras</h2>
                {groupedProducts.length === 0 ? (
                    <p>El carrito está vacío</p>
                ) : (
                    <div className="cart-items">
                        {groupedProducts.map((p, i) => (
                            <div key={i} className="cart-item">
                                <div
                                    className="product-cart-image"
                                    style={{ backgroundImage: `url(${p.image})` }}
                                ></div>

                                <div className="cart-info">
                                    <p className="cart-name">{p.name}</p>
                                    <p className="cart-description">{p.description}</p>
                                    
                                    <Price amount={p.price} className="cart-price" />

                                    <div className="cart-controls">
                                        <button onClick={() => decreaseQuantity(p.code)}>-</button>
                                        <span>{p.quantity || 1}</span>
                                        <button onClick={() => increaseQuantity(p.code)}>+</button>
                                    </div>

                                    <button
                                        className="cart-remove"
                                        onClick={() => removeFromCart(p.code)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

