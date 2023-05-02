import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import { MyContext } from '../MyContext'; 
import NavbarLog from "../NavbarLog";

const url ='http://127.0.0.1:8000/api/'

const Carrito = () => {
  const {user} = useContext(MyContext);
  const [compras, setCompras] = useState([]);
  const [talles, setTalles] = useState([]);
  const [productos, setProductos] = useState([]);
  const history = useNavigate();


  useEffect(()=>{
    if(user.email == '')
    {
        history("/")
    } else{
      getCompras();
      getTalles();
      getProductos();
    }
  },[]);

  const getCompras = async() =>{
    axios.post(url + "compras/listar", {
      email: user.email
    })
    .then(function (response){
        console.log(response.data);
        setCompras(response.data);
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
      <h1 className="titulo">Carrito de compras</h1>
      <hr></hr>
      <div className="row row-cols-auto">
        { compras.map((compra)=>(
          <div className="card col col-sm-6" style={{width: '18rem', margin: '1rem'}}>
            <div className="card-img-top">
              <img src={productos.find(producto => producto.id === compra.producto_id)['URLimagen']} 
              className="card-img-top" width="100" height="300" alt="Imagen del producto"></img>
            </div>
            <div className="card-body">
              <h3 className="card-title">{productos.find(producto => producto.id === compra.producto_id)['name'] }</h3>
              <p className="card-text"><samp style={{fontWeight: "bold", fontSize: "medium"}}>Precio: $</samp>
              {productos.find(producto => producto.id === compra.producto_id)['precio']}</p>
              <p className="card-text"><samp style={{fontWeight: "bold", fontSize: "medium"}}>Talle: </samp>
              {talles.find(talle => talle.id === compra.talle_id)['name']}</p>
              <p className="card-text"><samp style={{fontWeight: "bold", fontSize: "medium"}}>Cantidad: </samp>{compra.cantidad}</p>
            </div>
            <div>
              <button type="button" className="btn btn-primary" style={{margin:'0.5rem'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
              </svg>                                
                Editar
              </button>
              <button type="button" className="btn btn-danger" style={{margin:'0.5rem'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-x-fill" viewBox="0 0 16 16">
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7.354 5.646 8.5 6.793l1.146-1.147a.5.5 0 0 1 .708.708L9.207 7.5l1.147 1.146a.5.5 0 0 1-.708.708L8.5 8.207 7.354 9.354a.5.5 0 1 1-.708-.708L7.793 7.5 6.646 6.354a.5.5 0 1 1 .708-.708z"/>
              </svg>                              
                Eliminar
              </button>
            </div>
          </div>
        ))
        }
      </div>
    </main>
    </>
  )
}

export default Carrito