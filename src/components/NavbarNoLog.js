import { Link } from "react-router-dom";
import Logo from '../logo.jpeg';


const NavbarNoLog = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary  bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <Link to={"/"}>
          <img className='navbar-logo img-thumbnail' src={Logo} alt="logo" height={60} width={100}/>
        </Link>        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarSupportedContent" style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link to={"/signin"}>
            <button type='button' className='btn btn-link' style={{margin:'0.5rem'}}>Iniciar Sesion</button>
          </Link>
          <Link to={"/signup"}>
            <button type='button' className='btn btn-link' style={{margin:'0.5rem'}}>Registrarse</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarNoLog;