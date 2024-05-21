import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import DropdownMenu from '../components/DropdownMenu';
import Footer from '../components/Footer';
import Loading from '../components/Loading ';
import SearchBar from '../components/SearchBar';
import { User } from '../models/user';
import { RootState } from '../store/store';
import './Home.scss';



const Home = () => {
  const user = useSelector((state: RootState) => state.user.user) as User | null;
  const cartOrderCount = useSelector((state: RootState) => state.cart.orderCount);
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const [animateCart, setAnimateCart] = useState(false);

  useEffect(() => {
    if (cartOrderCount > 0) {
      setAnimateCart(true);
      setTimeout(() => setAnimateCart(false), 1000 * 2); // 动画持续时间后重置动画状态
    }
  }, [cartOrderCount]);

  return (
    <div className="home">
      <div className = "top-container">
      <div className="top-right">
        <Link to="/order-enquiry">Order Enquiry</Link>
        <Link to="/cart" className={animateCart ? 'cart-animate' : ''}>
          <FontAwesomeIcon icon={faShoppingCart} />
          {cartOrderCount > 0 && 
            <span className="cart-quantity-badge">{cartOrderCount}</span>
          }
        </Link>
        {user ? (
          <DropdownMenu />
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>

      <div className="full-width">
        <nav className="navigation-bar">
        <Link to="/">
          <span style={{ fontWeight: 'bold',  fontSize: 'x-large' }}>IOTBAY</span>
        </Link>
          <Link to="/sensors">Sensors</Link>
          <Link to="/actuators">Actuators</Link>
          <Link to="/gateways">Gateways</Link>
          <Link to="/about">About Us</Link>
        </nav>
    
        <SearchBar />
   
      </div>
      </div>

      {isLoading ? <Loading /> : <Outlet />}

      <Footer />
    </div>
  );
};

export default Home;