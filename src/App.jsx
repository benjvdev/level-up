import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Inicio from './components/pages/Pagina inicio/Inicio'
import About from './components/pages/About page/About'
import { Link } from 'react-router-dom'
import Register from './components/pages/Pagina Registro/Register'
import Cart from './components/pages/Cart Page/Cart'
import CategoryPage from './components/pages/Category page/CategoryPage.jsx'
import DetalleProducto from './components/pages/Detalle Producto/DetalleProducto'
import AdminRoute from './admin/AdminRoute'
import ProductListAdmin from './admin/ProductListAdmin/ProductListAdmin'
import AdminPage from './admin/Admin page/AdminPage'
import ProductForm from './admin/Admin Product Form/ProductForm'
import SearchResults from './components/pages/Search Results/SearchResults.jsx'



function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/register' element={<Register />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/categories/:categoryName" element={<CategoryPage />} />
        <Route path="/product/:id" element={<DetalleProducto />} />
         <Route path="/search" element={<SearchResults/>} />

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminPage />}>
            <Route index element={<ProductListAdmin />} /> 
            <Route path="products" element={<ProductListAdmin />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/edit/:id" element={<ProductForm />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );  
}

export default App
