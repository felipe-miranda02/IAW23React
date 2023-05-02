import { Link, useNavigate } from "react-router-dom";
import Logo from '../logo.jpeg';
import { MyContext } from './MyContext'; 
import { useContext } from 'react'; 


const NavbarLog = () => {
  const {user, setUser} = useContext(MyContext);
  const history = useNavigate();

  const cerrarSesion = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      name: '',
      email: ''
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    history("/");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary  bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <Link to={"/"}>
          <img className='navbar-logo img-thumbnail' src={Logo} alt="logo" height={60} width={100}/>
        </Link>        

        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to={"/carrito"} style={{textDecoration: 'none' }}>
              <a className="nav-link" style={{ color: 'white'}}>Carrito 🛒</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/historialDeCompra"} style={{textDecoration: 'none' }}>
              <a className="nav-link" style={{ color: 'white'}}>Historial de compras</a>
            </Link>
          </li>
        </ul>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <span className="" style={{ color: 'white'}}>Bienvenido {user.name}</span>
        </div>
        <div id="navbarSupportedContent" style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link to={"/"}>
            <button type='button' className='btn btn-link' style={{margin:'0.5rem'}} onClick={cerrarSesion}>Cerrar Sesion</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLog;