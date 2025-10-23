import React from 'react'
import TopBar from '../../organisms/Top Bar/TopBar'
import Product from '../../organisms/Product/Product'
import './Inicio.css'
import allProducts from '../../../data/products.json'
import CategoryMenu from '../../organisms/Category Menu/CategoryMenu'

export default function Inicio() {
  

  return (
    <>
    <TopBar/> 
    <CategoryMenu/>
    <div id="products">
        {allProducts.map((p) => (
          <Product key={p.code} {...p} />
        ))}
      </div>      
    </>
  )
}
