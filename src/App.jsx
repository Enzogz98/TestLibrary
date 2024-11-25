import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home"
import './App.css'
import Libros from "./pages/Libros";
import Editorial from "./pages/Editorial";
import Autores from "./pages/Autores";

function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path='/home' element={<Home/>} />
      <Route path='/libros' element={<Libros/>} />
      <Route path='/editorial' element={<Editorial/>} />
      <Route path='/autores' element={<Autores/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
