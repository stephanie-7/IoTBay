import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  total: number;
}

interface CartState {
  items: { [id: string]: CartItem };
  totalQuantity: number;
  totalAmount: number;
  orderCount: number;
}

const initialState: CartState = {
  items: {},
  totalQuantity: 0,
  totalAmount: 0,
  orderCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const item = action.payload;
      if (state.items[item.id]) {
        // 如果产品已经在购物车中，更新数量和总价
        state.items[item.id].quantity += item.quantity;
        state.items[item.id].total += item.price * item.quantity;
      } else {
        // 如果不在购物车中，添加新项
        state.items[item.id] = item;
      }
      state.totalQuantity += item.quantity;
      state.totalAmount += item.price * item.quantity;
    },


    removeFromCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      const existingItem = state.items[id];
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.total;
        delete state.items[id];
        state.orderCount -= 1;  // 减少订单数量
      }
    },
    
 
      increaseOrderCount(state) {
        state.orderCount += 1;
    },
    clearCart: state => {
      state.items = {};
      state.totalAmount = 0;
      state.orderCount = 0;
    },
    
  },
});

export const { addToCart, removeFromCart,increaseOrderCount,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
