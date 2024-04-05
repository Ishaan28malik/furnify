import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {ProductType} from '../../api/shop';

interface CartItemType extends ProductType {
  quantity: number;
}

interface initialStateType {
  items: CartItemType[];
  totalPrice: number;
  taxAmount: number;
}

const TAX_PERCENTAGE = 2;

const initialState: initialStateType = {
  items: [],
  totalPrice: 0,
  taxAmount: 0,
};

export const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemType>) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<CartItemType>) => {
      state.items = state.items.filter(item => action.payload.id !== item.id);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{productID: number; quantity: number}>,
    ) => {
      state.items.forEach(item => {
        if (item.id === action.payload.productID) {
          item.quantity = action.payload.quantity;
        }
      });
    },
    updateTotalPrice: state => {
      state.totalPrice = state.items.reduce((acc, item) => {
        return (acc += item.price);
      }, 0);

      state.taxAmount = state.totalPrice * (TAX_PERCENTAGE / 100);
    },
    clearCart: state => {
      state.items = [];
      state.totalPrice = 0;
      state.taxAmount = 0;
    },
  },
});
