import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Products.css";

const url ='http://127.0.0.1:8000/api/' 
const paginaUrl = "http://localhost:3000/"
let filtrosMarca = []
let filtrosTipo = []
let search = ""

const Products = () => {

    const [productos, setProductos] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [results, setResults] = useState([]);


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

    useEffect(() => {
        getMarcas();
        getTipos();
        getProductos();
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


    return (
        <div class="container-fluid row flex" style={{margin: '1rem'}}>
            <nav class="col-xl-2 col-lg-3 col-md-4 col-sm-12">
                <div class="accordion" id="Marcas">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Marcas
                            </button>
                        </h2>
                        {marcas.map((marca) =>(
                            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">
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
                <div class="accordion my-3" id="categorias">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwo">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                Categorias
                            </button>
                        </h2>
                        {tipos.map((tipo) =>(
                        <div id="collapseTwo" class="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
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
            <main class="container col-lg-8 col-md-8">
            <h1 class="titulo">Productos</h1>
            <hr></hr>
            <input value={search} onChange={searcher} type="text" placeholder='Search' className='form-control'/>
                <div class="row row-cols-auto">

                    { results.map( (producto)=>(
                        <div class="card col col-sm-6" style={{width: '18rem', margin: '1rem'}}>
                            <div class="card-img-top">
                                <img src={producto.URLimagen} class="card-img-top" width="100" height="300" alt="Imagen del producto"></img>
                            </div>
                            <div class="card-body">
                                <h3 class="card-title">{producto.name}</h3>
                                <p class="card-text"><samp style={{fontWeight: "bold", fontSize: "medium"}}>Precio: </samp>{producto.precio}</p>
                                <p class="card-text"><samp style={{fontWeight: "bold", fontSize: "medium"}}>Tipo: </samp>{tipos.find(tipo => tipo.id === producto.tipo_id)['name']}</p>
                                <p class="card-text"><samp style={{fontWeight: "bold", fontSize: "medium"}}>Marca: </samp>{marcas.find(marca => marca.id === producto.marca_id)['name']}</p>
                                <p class="card-text"><samp style={{fontWeight: "bold", fontSize: "medium"}}>Descripcion: </samp>{producto.descripcion}</p>                        
                            </div>
                        </div>
                    ))
                    }
                </div>
            </main>
        </div>
    )
}

export default Products
