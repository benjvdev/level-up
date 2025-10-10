import React from 'react'

export default function Cart() {
    const products = JSON.parse(localStorage.getItem('products')) || []
  return (
    <>
        <div id='cart-container'>
            <p>🛒<span className="items">{products.length}</span></p>
            <table>
                <thead>
                    <tr>
                        <th>CODIGO</th>
                        <th>IMAGEN</th>
                        <th>NOMBRE</th>
                        <th>DESCRIPCION</th>
                        <th>PRECIO</th>
                        <th>ELIMINAR</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(p=>(
                            <tr key={p.code}>
                                <td>{p.code}</td>
                                <td>
                                    <img src={p.image}/>
                                </td>
                                <td>{p.name}</td>
                                <td>{p.description}</td>
                                <td>{p.price}</td>
                                <td><a href='#'>eliminar</a></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <br />
            <button onClick={()=> localStorage.removeItem('products')}>Vaciar</button>
        </div>
    </>
  )
}
