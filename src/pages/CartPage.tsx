import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart, removeFromCart } from '../features/cartSlice';
import { createOrder, selectOrderError } from '../features/orderSlice';
import { selectUser } from '../features/userSlice';
import { AppDispatch, RootState } from '../store/store';
import './CartPage.scss';

const CartPage = () => {
  const cartItems = useSelector((state:RootState) => state.cart.items);
  const totalAmount = useSelector((state:RootState) => state.cart.totalAmount);
  const orderError = useSelector(selectOrderError); 
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleRemoveFromCart = (id:string) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    debugger;
    const orderData = {
      items: Object.values(cartItems).map(item => ({
        product_id: parseInt(item.id, 10),
        quantity: item.quantity
      })),
      totalAmount,
      userId: user ? user.id : null
    };
  
    console.log("Initiating order creation with data:", orderData);
  
    dispatch(createOrder(orderData))
      .then(unwrapResult)
      .then(response => {
        console.log("Received response:", response);
        if (!response || !response.order_id) {
          throw new Error("Order ID is missing in the response");
        }
        console.log("Order created successfully, navigating to order detail page with order_id:", response.order_id);
        navigate(`/order/${response.order_id}`);
      })
      .catch(error => {
        console.error("Error during order creation:", error);
        dispatch(clearCart());
        navigate('/cart');
      });
  };
  


  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Actions</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(cartItems).map((item) => (
            <tr key={item.id} className="cart-item">
              <td>
                <img src={item.image} alt={item.name} />
              </td>
              <td>{item.name}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>
              <button onClick={() => handleRemoveFromCart(item.id)} className="remove-item">
              Remove
            </button>
              </td>
              <td>${item.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-summary">
        <p>Total Price: ${totalAmount.toFixed(2)}</p>
        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
