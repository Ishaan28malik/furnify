import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {CategoryType, ProductType} from '../../api/shop';
import { CartItemType } from './cartSlice';

interface OrderType {
    items: CartItemType[];
    id: number;
    order_date: string;
    totalAmount: number;
    // billingAddress: string;
}

interface initialStateType {
    orders: OrderType[];
    orderDetails: OrderType | null;
    generatedOrderID: number | null;

}

const initialState: initialStateType = {
    orders: [],
    orderDetails: null,
    generatedOrderID: null,
};

const ordersSlice = createSlice({
  name: 'Orders',
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<OrderType>) => {
        state.orders.push(action.payload);
    },
    createOrderID: (state) => {
        state.generatedOrderID = state.orders.length + 1;
    }
  },
});

export const {
    createOrder,
    createOrderID
} = ordersSlice.actions;

export default ordersSlice.reducer;
