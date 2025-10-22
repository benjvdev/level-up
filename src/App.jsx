import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Inicio from './components/pages/Pagina inicio/Inicio'
import About from './components/pages/About page/About'
import { Link } from 'react-router-dom'
import Register from './components/pages/Pagina Registro/Register'
import Cart from './components/pages/Cart Page/Cart'
import CategoryPage from './components/pages/Category page/CategoryPage.Jsx'


function App() {
  return (
    <BrowserRouter>
      {/* <Link to='/'>Home</Link>
      <Link to='/about'>About</Link> */}
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/register' element={<Register />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/categories/:categoryName" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );  
}

export default App
