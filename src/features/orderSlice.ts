// features/orderSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Order } from '../models/order';
import { RootState } from '../store/store';
import { setLoading } from './loadingSlice';

interface OrderState {
  currentOrder: Order | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface OrderData {
  items: {
    product_id: number;
    quantity: number;
  }[];
  totalAmount: number;
  userId: number | null;
}

const initialState: OrderState = {
  currentOrder: null,
  status: 'idle',
  error: null,
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData: OrderData, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    console.log("Sending data to server:", orderData);
    try {
      const response = await axios.post('http://127.0.0.1:5000/order/orders', orderData, {
        headers: {
          'Content-Type': 'application/json',  // 确保设置了 Content-Type 头
        },
      });
      dispatch(setLoading(false));
      console.log("Received data from server:", response.data);
      return response.data;
    } catch (error) {
      dispatch(setLoading(false));
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Unknown error occurred");
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const fetchOrderDetailsById = createAsyncThunk(
  'order/fetchOrderDetailsById', 
  async (orderId: string, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      debugger
      const response = await axios.get(`http://127.0.0.1:5000/order/orders/${orderId}`);
      console.log("Received order details data from server:", response.data);
      return response.data;
    } catch (error) {
      dispatch(setLoading(false));
      
      console.error("Error fetching order details:", error);

      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Unknown error occurred";
        return rejectWithValue(message);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const cancelOrder = createAsyncThunk(
  'order/cancelOrder',
  async (orderId: string, { dispatch, rejectWithValue, fulfillWithValue }) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(`http://127.0.0.1:5000/order/orders/${orderId}/cancel`);
      dispatch(setLoading(false));
      return fulfillWithValue({ success: true, data: response.data });
    } catch (error) {
      dispatch(setLoading(false));
      const message = axios.isAxiosError(error) ? error.response?.data?.message || "Unknown error occurred" : "An unexpected error occurred";
      return rejectWithValue(message);
    }
  }
);






const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.currentOrder = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.status = 'succeeded';
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = 'failed';
      })
      .addCase(fetchOrderDetailsById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderDetailsById.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchOrderDetailsById.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = 'failed';
      })
      .addCase(cancelOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(cancelOrder.fulfilled, (state) => {
        state.currentOrder = null; // 清空当前订单信息
        state.status = 'succeeded';
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = 'failed';
      });
  },
});

export const { clearOrder } = orderSlice.actions;

export const selectCurrentOrder = (state: RootState) => state.order.currentOrder;
export const selectOrderStatus = (state: RootState) => state.order.status;
export const selectOrderError = (state: RootState) => state.order.error;

export default orderSlice.reducer;
