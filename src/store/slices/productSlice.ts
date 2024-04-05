import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {ProductType} from '../../api/shop';

interface initialState {
  products: ProductType[];
  loading: boolean;
  error: null | string;
  productDetail: null | ProductType;
}

const initialState: initialState = {
  products: [],
  loading: false,
  error: null,
  productDetail: null,
};

export const productSlice = createSlice({
  name: 'Products',
  initialState,
  reducers: {
    requestProducts: state => {
      state.loading = true;
    },
    requestProductSuccess: (state, action: PayloadAction<ProductType[]>) => {
      state.products = action.payload;
      state.loading = false;
    },
    requestProductFailed: state => {
      state.loading = false;
      state.error = 'Failed to fetch product';
    },
    requestProduct: state => {
      state.loading = true;
    },
    requestProductDetailSuccess: (
      state,
      action: PayloadAction<ProductType>,
    ) => {
      state.productDetail = action.payload;
      state.loading = false;
    },
  },
});

export const {
  requestProductFailed,
  requestProductSuccess,
  requestProducts,
  requestProduct,
  requestProductDetailSuccess,
} = productSlice.actions;

export default productSlice.reducer;
