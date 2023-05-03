import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Products.css";
import { MyContext } from '../MyContext'; 
import { Modal, Button, Form } from "react-bootstrap";
import Swal from 'sweetalert2';

const url ='http://127.0.0.1:8000/api/' 
let filtrosMarca = []
let filtrosTipo = []
let search = ""

const Products = () => {

    const {user} = useContext(MyContext);
    const [productos, setProductos] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [results, setResults] = useState([]);
    const [talles, setTalles] = useState([]);
    const [cantidad, setCantidad] = useState(1);
    const [talle_id, setTalle_id] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [producto_id, setProducto_id] = useState(0);

     //función de búsqueda
    const searcher = (e) => {
        search= e.target.value;
    
        aplicarFiltros();
        if(search != ""){
            setResults(results.filter( dato =>
                dato.name.toLowerCase().includes(search.toLowerCase())));
        }
    } 

    //funciónes de filtrado
    const filtrarMarca = (e) => {
        search = "";
        const {value, checked} = e.target;
        if(checked){
            filtrosMarca.push(value);
        } else{
            filtrosMarca.splice(filtrosMarca.indexOf(value), 1)
        }
        aplicarFiltros();
    }  

    const filtrarTipo = (e) => {
        search = "";
        const {value, checked} = e.target;
        if(checked){
            filtrosTipo.push(value);
        } else{
            filtrosTipo.splice(filtrosTipo.indexOf(value), 1)
        }
        aplicarFiltros();
    }

    const aplicarFiltros = () => {
        if(filtrosMarca.length > 0 && filtrosTipo.length > 0){
            setResults(productos.filter(producto => filtrosMarca.includes(marcas.find(marca => marca.id === producto.marca_id)['name']) &&
                                                    filtrosTipo.includes(tipos.find(tipo => tipo.id === producto.tipo_id)['name'])));
        } else if (filtrosMarca.length > 0){
            setResults(productos.filter(producto => filtrosMarca.includes(marcas.find(marca => marca.id === producto.marca_id)['name'])));
        } else if (filtrosTipo.length > 0){
            setResults(productos.filter(producto => filtrosTipo.includes(tipos.find(tipo => tipo.id === producto.tipo_id)['name'])));
        } else {
            setResults(productos);
        }
    }

    //al cargar el componente
    useEffect(() => {
        getMarcas();
        getTipos();
        getProductos();
        getTalles();
    },[]);

    const getProductos = async() =>{
        const respuesta = await axios.get(url + "productos");
        setProductos(respuesta.data);
        setResults(respuesta.data);
    }

    const getMarcas = async() =>{
        const respuesta = await axios.get(url + "marcas");
        setMarcas(respuesta.data);
    }

    const getTipos = async() =>{
        const respuesta = await axios.get(url + "tipos");
        setTipos(respuesta.data);
    }

    const getTalles = async() =>{
        const respuesta = await axios.get(url + "talles");
        setTalles(respuesta.data);
    }

    // añadir un producto al carrito
    const añadir = (e) => {
        handleOpenModal();
        setProducto_id(e.target.value);
    }

    const crearCompra = (e) => {
        axios.post(url + "compras/añadir", {
            email: user.email,
            producto_id: producto_id,
            talle_id: talle_id,
            cantidad: cantidad
          })
          .then(function (response){
              console.log(response.data);
              Swal.fire({
                icon: 'success',
                title: '',
                text: 'Se ha añadido el producto a tu carrito',
            });
              setShowModal(false);
              setCantidad(1);
              setTalle_id(1);
          })
          .catch(function (error){
              console.log(error)
          })
    }

    const handleCantidadChange = (e) => {
        setCantidad(e.target.value);
      };
    
      const handleTallaChange = (e) => {
        setTalle_id(e.target.value);
      };

      const handleOpenModal = () => {
        setShowModal(true);
      };
    
      const handleCloseModal = () => {
        setShowModal(false);
      };    

    return (
        <>
        <div className="container-fluid row flex" style={{margin: '1rem'}}>
            <nav className="col-xl-2 col-lg-3 col-md-4 col-sm-12">
                <div className="accordion" id="Marcas">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Marcas
                            </button>
                        </h2>
                        {marcas.map((marca) =>(
                            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <input 
                                            onChange={filtrarMarca}
                                            type='checkbox'
                                            name='nombreMarca'
                                            value={marca.name}
                                            id={marca.name}
                                            />
                                            <label from={marca.name}>
                                                {marca.name}								
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
                <div className="accordion my-3" id="categorias">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                Categorias
                            </button>
                        </h2>
                        {tipos.map((tipo) =>(
                        <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                    <input 
                                            onChange={filtrarTipo}
                                            type='checkbox'
                                            name='nombreTipo'
                                            value={tipo.name}
                                            id={tipo.name}
                                            />
                                            <label from={tipo.name}>
                                                {tipo.name}								
                                            </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        ))
                        }
                    </div>
                </div>
            </nav>
            <main className="container col-lg-8 col-md-8">
            <h1 className="titulo">Productos</h1>
            <hr></hr>
            <input value={search} onChange={searcher} type="text" placeholder='Search' className='form-control'/>
                <div className="row row-cols-auto">

                    { results.map( (producto)=>(
                        <div className="card col col-sm-6" style={{width: '18rem', margin: '1rem'}}>
                            <div className="card-img-top">
                                <img src={producto.URLimagen} class="card-img-top" width="100" height="300" alt="Imagen del producto"></img>
                            </div>
                            <div class="card-body">
                                <h3 className="card-title">{producto.name}</h3>
                                <p className="card-text"><samp style={{fontWeight: "bold", fontSize: "medium"}}>Precio: $</samp>{producto.precio}</p>
                                <p className="card-text"><samp style={{fontWeight: "bold", fontSize: "medium"}}>Tipo: </samp>{tipos.find(tipo => tipo.id === producto.tipo_id)['name']}</p>
                                <p className="card-text"><samp style={{fontWeight: "bold", fontSize: "medium"}}>Marca: </samp>{marcas.find(marca => marca.id === producto.marca_id)['name']}</p>
                                <p className="card-text"><samp style={{fontWeight: "bold", fontSize: "medium"}}>Descripcion: </samp>{producto.descripcion}</p>                        
                            </div>
                            {(user.email != '')?
                            <button type="button" className="btn btn-success" style={{margin:'0.5rem'}} onClick={añadir} value={producto.id}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z"/>
                                </svg>                                
                                Añadir
                            </button>
                            : ''
                            }
                        </div>
                    ))
                    }
                </div>
            </main>
        </div>
        
        <Modal show={showModal} onHide={handleCloseModal}>
         <Modal.Header closeButton>
           <Modal.Title>Añadir al carrito</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <Form>
             <Form.Group controlId="cantidad">
               <Form.Label>Cantidad</Form.Label>
               <Form.Control
                 type="number"
                 min="1"
                 value={cantidad}
                 onChange={handleCantidadChange}
               />
             </Form.Group>
             <Form.Group controlId="talle">
               <Form.Label>Talle</Form.Label>
               <Form.Control as="select" value={talle_id} onChange={handleTallaChange}>
                {
                    talles.map((talle) => (
                        <option value={talle.id}>{talle.name}</option>
                    ))
                }
               </Form.Control>
             </Form.Group>
           </Form>
         </Modal.Body>
         <Modal.Footer>
           <Button variant="primary" onClick={crearCompra}>
             Añadir al carrito
           </Button>
         </Modal.Footer>
       </Modal>
       </>
    )
}

export default Products


