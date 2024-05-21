import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ShipmentDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, amount } = location.state || { orderId: null, amount: null };

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const handleConfirm = async () => {
    console.log("order id is :" , orderId);
    try {
    debugger
      const response = await axios.post('http://127.0.0.1:5000/shipment/create', {
        order_id: orderId,
        method: "Australia Post",
        status: "pending",
        street,
        city,
        state,
        postal_code: postalCode,
        country
      });
      alert(`Shipment created successfully: ${response.data.message}`);
      navigate('/invoice', { state: { orderId: orderId } }); // Navigate to invoice page
    } catch (error:unknown) {
        if (typeof error === 'object' && error !== null && 'response' in error) {
            const axiosError = error as { response: { data: { message: string } } };
            alert(`Shipment failed: ${axiosError.response.data.message}`);
          } else {
            alert(`Shipment failed: Unexpected error`);
          }
      navigate(-1);  // Go back
    }
  };

  const handleCancel = () => {
    navigate(-1);  // Go back
  };

  return (
    <div>
      <h1>Shipment Details</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Street" required />
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required />
        <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" required />
        <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Postal Code" required />
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" required />
        <button type="button" onClick={handleConfirm}>Confirm</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default ShipmentDetail;
