import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearCart } from '../features/cartSlice';
import { cancelOrder, fetchOrderDetailsById } from '../features/orderSlice';
import { AppDispatch, RootState } from '../store/store';


const OrderDetail = () => {
  const { orderId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const order = useSelector((state:RootState)=> state.order.currentOrder);
  const orderStatus = useSelector((state:RootState) => state.order.status);
  const navigate = useNavigate();

  const formatDate = (dateStr:string) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
  };

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderDetailsById(orderId));
      
    }
  }, [orderId, dispatch]);

  useEffect(() => {
    console.log(order);  
    console.log(orderStatus);  
  }, [order, orderStatus]);
  
  const handleConfirm = () => {
    if (order) {
      navigate('/payment', { state: { orderId: order.order_id, amount: order.total_amount } });
    } else {
      console.error("Error: Order is null, cannot navigate to payment page.");
    }
  };
  

  const handleCancel = useMemo(() => {
    return () => {
      if (window.confirm("You will return to the home page. Please re-operate to complete the order.")) {
        if (orderId) {
          dispatch(cancelOrder(orderId))
            .unwrap()
            .then((result) => {
              console.log('Order cancellation successful:', result);
              dispatch(clearCart());
              navigate('/');
              console.log("Order cancelled successfully. Details:", result);
            })
            .catch((error) => {
              console.error("Error cancelling order:", error);
              console.error("Failed to cancel order. Error:", error);
            });
        } else {
          console.error("Order ID is undefined, cannot cancel the order.");
        }
      }
    };
  }, [dispatch, navigate, orderId]);
  
  
  
  

  if (orderStatus === 'loading') {
    return <div>Loading order details...</div>;
  }

  if (!order) {
    return <div>No order found or error loading the details.</div>;
  }

  return (
    <div>
  <h1>Order Detail</h1>
  {order ? (  // 检查 order 是否存在
    <div>
    <p>Order ID: {order.order_id}</p>
    <p>Customer ID: {order.customer_id || "Guest"}</p>
    <p>Status: {order.status}</p>
    <p>Created At: {formatDate(order.created_at)}</p>
    <p>Updated At: {formatDate(order.updated_at)}</p>
    <p>Subtotal: ${order.subtotal ? order.subtotal.toFixed(2) : '0.00'}</p>
    <p>Tax: ${order.tax ? order.tax.toFixed(2) : '0.00'}</p>
    <p>Shipping Cost: ${order.shipping_cost ? order.shipping_cost.toFixed(2) : '0.00'}</p>
    <p>Total Amount: ${order.total_amount ? order.total_amount.toFixed(2) : '0.00'}</p>

      <div>
        <h2>Items:</h2>
        {order.items && order.items.map((item, index) => (  // 检查 items 是否存在
          <div key={index}>
            <h3>Product Details</h3>
            <p>Name: {item.product_name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.price}</p>
          </div>
        ))}
      </div>
      <button onClick={handleConfirm}>Confirm</button>
      <button onClick={handleCancel}>Cancel</button>
  
    </div>
    
  ) : (
    <p>Loading order details...</p>  // 显示加载信息
  )}
</div>


  );
};

export default OrderDetail;
