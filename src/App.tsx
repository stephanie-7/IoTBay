
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import HomeTable from './components/HomeTable';
import Login from './components/Login';
import Register from './components/Register';
import SearchBar from './components/SearchBar';
import { fetchProducts } from './features/productSlice';
import ActuatorsPage from './pages/Actuators';
import CartPage from './pages/CartPage';
import GatewaysPage from './pages/Gateways';
import Home from './pages/Home';
import InvoicePage from './pages/InvoicePage';
import OrderDetail from './pages/OrderDetail';
import PaymentPage from './pages/PaymentPage';
import SearchResults from './pages/SearchResults';
import SensorPage from './pages/Sensors';
import ShipmentDetail from './pages/ShipmentDetial';
import UserInfoUpdate from './pages/UserInfoUpdate ';
import UserLog from './pages/UserLog';
import UserOrderList from './pages/UserOrderList';
import WelcomePage from './pages/WelcomePage ';
import LogoutPage from './pages/logout';
import { AppDispatch } from './store/store';



function App() {

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    debugger
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/search" element={<SearchBar />} />
          <Route index element={<HomeTable />} /> 
          <Route path="sensors" element={<SensorPage />} />
          <Route path="actuators" element={<ActuatorsPage />} />
          <Route path="gateways" element={<GatewaysPage />} />
          <Route path="search-results" element={<SearchResults />} />
          <Route path="userinfo-update" element={<UserInfoUpdate />} />
          <Route path="UserLog" element={<UserLog />} />
          <Route path="UserOrderList" element={<UserOrderList />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/order/:orderId" element={<OrderDetail />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/shipment" element={<ShipmentDetail />} />
        <Route path="/invoice" element={<InvoicePage />} />
      </Routes>
    </Router>
  );
}

export default App;
