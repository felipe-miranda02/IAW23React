import NavbarLog from "../NavbarLog";
import NavbarNoLog from "../NavbarNoLog"
import Banner from "../Banner/Banner";
import Products from "../Products/Products";
import { MyContext } from '../MyContext'; 
import { useContext } from 'react'; 

const Home = () => {
  const {user} = useContext(MyContext);
  return (
    <>
      {(user.email == '') ? <NavbarNoLog />: <NavbarLog />}
      <Banner />
      <div className='product-card-container'>
        <Products />
      </div>
    </>
  );
};

export default Home;
