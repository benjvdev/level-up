import React from 'react'
import TopBar from '../../organisms/Top Bar/TopBar'
import Product from '../../organisms/Product/Product'
import './Inicio.css'

export default function Inicio() {
  

  return (
    <>
    <TopBar/> 
    <div id="products">
        <Product
            code="1"
            image="https://i5.walmartimages.cl/asr/55c8b34e-637a-4c7e-91a6-cf5edf74031e.8e578ce5b098c035cadfb2d5c4d6a09b.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"
            name="labubu"
            description="esta wea es pa wekos"
            price="$89.990" />
        <Product
            code="2"
            image="https://casaverde.mx/cdn/shop/files/te-matcha-propiedades-y-usos_01.jpg?v=1717786284&width=493"
            name="Te matcha"
            description="no se ni q wea es"
            price="$4.990" />
        <Product
            code="3"
            image="https://casaverde.mx/cdn/shop/files/te-matcha-propiedades-y-usos_01.jpg?v=1717786284&width=493"
            name="Te matcha"
            description="no se ni q wea es"
            price="$4.990" />
        <Product
            code="3"
            image="https://casaverde.mx/cdn/shop/files/te-matcha-propiedades-y-usos_01.jpg?v=1717786284&width=493"
            name="Te matcha"
            description="no se ni q wea es"
            price="$4.990" />
        <Product
            code="1"
            image="https://i5.walmartimages.cl/asr/55c8b34e-637a-4c7e-91a6-cf5edf74031e.8e578ce5b098c035cadfb2d5c4d6a09b.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"
            name="labubu"
            description="esta wea es pa wekos"
            price="$89.990" />
        <Product
            code="1"
            image="https://i5.walmartimages.cl/asr/55c8b34e-637a-4c7e-91a6-cf5edf74031e.8e578ce5b098c035cadfb2d5c4d6a09b.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"
            name="labubu"
            description="esta wea es pa wekos"
            price="$89.990" />
        <Product
            code="1"
            image="https://i5.walmartimages.cl/asr/55c8b34e-637a-4c7e-91a6-cf5edf74031e.8e578ce5b098c035cadfb2d5c4d6a09b.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"
            name="labubu"
            description="esta wea es pa wekos"
            price="$89.990" />
    </div>  
    </>
  )
}
