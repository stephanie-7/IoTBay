import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearCart } from '../features/cartSlice';
import { AppDispatch } from '../store/store';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, amount } = location.state || { orderId: null, amount: 0 };
  const dispatch: AppDispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const formatCardNumber = (input: string) => {
    // Remove non-digit characters and add space every 4 digits
    const formatted = input.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim();
    setAccountNumber(formatted);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    debugger;
    event.preventDefault();
    console.log("Order ID:", orderId);
    console.log("Amount:", amount);
    

    try {
      const response = await axios.post('http://127.0.0.1:5000/payment/payments/process', {
        order_id: orderId,  
        username,
        password,
        amount,
        method: "Credit Card"
      });
      alert(`Payment success: ${response.data.message}`);
      dispatch(clearCart());  
      navigate('/shipment', { state: { orderId: orderId } });
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as { response: { data: { message: string } } };
        alert(`Payment failed: ${axiosError.response.data.message}`);
      } else {
        alert(`Payment failed: Unexpected error`);
      }
    }
  };

  const formatCreditCard = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  // Format expiry date: MM/YY
  const formatExpiryDate = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2').trim();
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Account Number:</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => formatCardNumber(e.target.value)}
            placeholder="Enter account number"
            required
            maxLength={19}  // Accommodates the format 9999 9999 9999 9999
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        <div>
          <label>Expiry Date:</label>
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
            required
          />
        </div>
        <div>
          <label>CVV:</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="CVV"
            required
            maxLength={3}
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="text"
            value={amount.toFixed(2)}
            disabled
          />
        </div>
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};


export default PaymentPage;
