import axios from 'axios';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setLoading } from '../features/loadingSlice';
import { selectCurrentOrder } from '../features/orderSlice';
import { AppDispatch, RootState } from '../store/store';

const InvoicePage = () => {
  const location = useLocation();
  const { orderId } = location.state || { orderId: null };
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector(selectCurrentOrder);
  const isLoading = useSelector((state: RootState) => state.order.status === 'loading');
  
  // Create invoice once order is loaded
  useEffect(() => {
    if (order && orderId) {
      debugger
      dispatch(setLoading(true));
      axios.post('http://127.0.0.1:5000/invoice/invoices', {
        order_id: order.order_id,
        amount: order.total_amount
      }).then(response => {
        console.log("Invoice created: ", response.data);
     
      }).catch(error => {
        console.error("Failed to create invoice: ", error);
      }).finally(() => {
        dispatch(setLoading(false));
      });
    }
  }, [order, orderId, dispatch, navigate]);

  const downloadInvoice = () => {
    const input = document.getElementById('invoice') as HTMLElement;
    html2canvas(input).then((canvas: HTMLCanvasElement) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save("invoice.pdf");
  });
};

  if (isLoading && !order) {
    return <p>Loading...</p>;
  }

  if (!order) {
    return <p>No order found or order details are still loading.</p>;
  }

  return (
    <div>
      <div id="invoice">
        <h1>Invoice Details</h1>
        <h2>Merchant Details</h2>
        <p>Name: IoTBay Electronics</p>
        <p>Address: 123 Tech Road, Sydney, NSW 2000</p>
        <p>Contact: (02) 1234 5678</p>

        <h2>Order Details</h2>
        <p>Order ID: {order.order_id}</p>
        <p>Customer ID: {order.customer_id || "Guest"}</p>
        <p>Total Amount: ${order.total_amount.toFixed(2)}</p>

        <h2>Items Purchased</h2>
        {order.items.map((item, index) => (
          <div key={index}>
            <p>Name: {item.product_name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
      <button onClick={downloadInvoice}>Download Invoice</button>
      <button onClick={() => navigate('/')}>Return Home</button>
    </div>
  );
};

export default InvoicePage;
