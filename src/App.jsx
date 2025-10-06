import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Inicio from './components/pages/Inicio'
import About from './components/pages/About'
import { Link } from 'react-router-dom'
import Register from './components/pages/Register'

function App() {
  return (
    <BrowserRouter>
      {/* <Link to='/'>Home</Link>
      <Link to='/about'>About</Link> */}
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  );  
}

export default App
