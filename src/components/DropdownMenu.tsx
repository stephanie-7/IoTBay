
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/userSlice';
import { RootState } from '../store/store';
import './DropdownMenu.scss';





const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      dispatch(logout()); 
      localStorage.removeItem('user'); 
      navigate('/logout'); 
    };
  
    return (
      <div className="top-right-dropdown"> 
        <button className="dropbtn" onClick={() => setIsOpen(!isOpen)}>
          Welcome, {user?.email}
        </button>
        {isOpen && (
          <div className="dropdown-content">
          <Link to="/userinfo-update">UserInfo</Link>
          <Link to="/UserLog">UserLog</Link>
          <Link to="/UserOrderList">MyOrderList</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
        )}
      </div>
    );
  };

  export default DropdownMenu;
  