import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../features/loadingSlice';
import { selectUser } from '../features/userSlice';
import { AppDispatch, RootState } from '../store/store';

interface Order {
  order_id: number;
  total_amount: number;
}

const MyOrderList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [hasFetched, setHasFetched] = useState(false); // 新增状态变量
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const user = useSelector(selectUser);
  const dispatch: AppDispatch = useDispatch();

  const fetchOrders = async () => {
    if (user && user.id) {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(`http://127.0.0.1:5000/order/orders/by-user/${user.id}`);
        console.log("Orders response:", response.data);
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      console.error("User not logged in or user ID missing");
    }
  };

  useEffect(() => {
    if (!hasFetched && user) {
      fetchOrders();
      setHasFetched(true); // 确保只调用一次
    }
  }, [user]);  // 依赖 user

  return (
    <div>
      <h1>Your Orders</h1>
      {isLoading && <p>Loading...</p>}
      {!isLoading && orders.length === 0 && (
        <div>
          <p>You do not have any orders yet.</p>
        </div>
      )}
      {!isLoading && orders.length > 0 && (
        <ul>
          {orders.map(order => (
            <li key={order.order_id}>
              Order ID: {order.order_id}, Total Amount: ${order.total_amount.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrderList;
