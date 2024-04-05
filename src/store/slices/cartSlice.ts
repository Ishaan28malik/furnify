import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {ProductType} from '../../api/shop';

interface CartItemType extends ProductType {
  quantity: number;
  totalPrice: number;
}

interface initialStateType {
  items: CartItemType[];
  grandTotal: number;
  taxAmount: number;
}

const TAX_PERCENTAGE = 2;

const initialState: initialStateType = {
  items: [],
  grandTotal: 0,
  taxAmount: 0,
};

const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemType>) => {
      state.items.push(action.payload);
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => action.payload !== item.id);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{productID: number; quantity: number}>,
    ) => {
      state.items.forEach(item => {
        if (item.id === action.payload.productID) {
          item.quantity = action.payload.quantity;
          item.totalPrice = action.payload.quantity * item.price;
        }
      });
    },
    updateTotalPrice: state => {
      state.grandTotal = state.items.reduce((acc, item) => {
        return (acc += item.price);
      }, 0);
      state.taxAmount = state.grandTotal * (TAX_PERCENTAGE / 100);
    },
    clearCart: state => {
      state.items = [];
      state.grandTotal = 0;
      state.taxAmount = 0;
    },
  },
});

export const {
  addToCart,
  clearCart,
  removeItemFromCart,
  updateQuantity,
  updateTotalPrice,
} = cartSlice.actions;

export default cartSlice.reducer;
