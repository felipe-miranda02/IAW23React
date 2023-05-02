import './App.css';
import Home from "./components/Home/Home";
import Carrito from "./components/Carrito/Carrito"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import { MyContextProvider } from './components/MyContext';
import HistorialDeCompra from './components/HistorialDeCompra';

function App() {
  return (
    <MyContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/carrito" element={<Carrito/>} />
          <Route path="/historialDeCompra" element={<HistorialDeCompra/>} />
        </Routes>
      </BrowserRouter>
    </MyContextProvider>
  );
}

export default App;
