import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import { MyContext } from './MyContext'; 
import NavbarLog from "./NavbarLog";

const url ='http://127.0.0.1:8000/api/'

const HistorialDeCompra = () => {
  
  const {user} = useContext(MyContext);
  const [productos, setProductos] = useState([]);
  const [historialCompras, setHistorialCompras] = useState([]);
  const [talles, setTalles] = useState([]);
  const history = useNavigate();

  useEffect(()=>{
    if(user.email == '')
    {
        history("/")
    } else{
      getHistorialCompras();
      getProductos();
      getTalles();
    }
  },[]);

  const getHistorialCompras = async() =>{
    axios.post(url + "historialCompras", {
      email: user.email
    })
    .then(function (response){
        setHistorialCompras(response.data);
    })
    .catch(function (error){
        console.log(error)
    })
  }

  const getProductos = async() =>{
    const respuesta = await axios.get(url + "productos");
    setProductos(respuesta.data);
  }

  const getTalles = async() =>{
    const respuesta = await axios.get(url + "talles");
    setTalles(respuesta.data);
  }

  return (
    <>
    <NavbarLog/>
    <main className="container col-lg-8 col-md-8">
      <h1 className="titulo">Historial de compras</h1>
      <hr></hr>
      <div className="row row-cols-auto">
        { historialCompras.map((compra)=>(
          <div className="card col col-sm-6" style={{width: '18rem', margin: '1rem'}}>
            <div className="card-img-top">
              <img src={productos.find(producto => producto.id === compra.producto_id)['URLimagen']} 
              className="card-img-top" width="100" height="300" alt="Imagen del producto"></img>
            </div>
            <div className="card-body">
              <h3 className="card-title">{productos.find(producto => producto.id === compra.producto_id)['name'] }</h3>
              <p className="card-text"><samp style={{fontWeight: "bold", fontSize: "medium"}}>Precio de compra por unidad: $</samp>{compra.precio}</p>
              <p className="card-text"><samp style={{fontWeight: "bold", fontSize: "medium"}}>Talle: </samp>
              {talles.find(talle => talle.id === compra.talle_id)['name']}</p>
              <p className="card-text"><samp style={{fontWeight: "bold", fontSize: "medium"}}>Cantidad: </samp>{compra.cantidad}</p>
              <p className="card-text"><samp style={{fontWeight: "bold", fontSize: "medium"}}>Fecha de compra: </samp>{compra.fecha}</p>
            </div>
          </div>
        ))
        }
      </div>
    </main>
    </>
  )
}

export default HistorialDeCompra