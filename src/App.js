import './App.css';
import Home from "./components/Home/Home";
import Carrito from "./components/Carrito/Carrito"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './components/Products/Products';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/carrito" element={<Carrito/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
