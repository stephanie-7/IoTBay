import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product, ProductsState } from '../models/products';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get<{ products: Product[] }>('http://127.0.0.1:5000/product/get_all_products');
    return response.data.products;
  }
);

const initialState: ProductsState = {
  productsByCategory: {
    Sensors: [],
    Actuators: [],
    Gateways: [],

  },
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'idle';
        // 分类产品到对应的类别
        state.productsByCategory.Sensors = action.payload.filter(product => product.category === 'Sensors');
        state.productsByCategory.Actuators = action.payload.filter(product => product.category === 'Actuators');
        state.productsByCategory.Gateways = action.payload.filter(product => product.category === 'Gateways');
 
      })
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default productsSlice.reducer;
