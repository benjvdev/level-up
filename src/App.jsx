import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Inicio from './components/pages/Inicio'
import About from './components/pages/About'
import { Link } from 'react-router-dom'
import Register from './components/pages/Register'
import Cart from './components/pages/Cart'

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
      </Routes>
    </BrowserRouter>
  );  
}

export default App
