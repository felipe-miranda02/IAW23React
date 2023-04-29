import { Link } from "react-router-dom";
import Logo from '../../logo.jpeg';
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className='nav-container'>
      <nav className='navbar'>
        <Link to={"/"}>
          <img className='navbar-logo img-thumbnail' src={Logo} alt="logo" height={60} width={100}/>
        </Link>
        <Link className='seeCarrito' to={"/carrito"}>
          🛒
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
