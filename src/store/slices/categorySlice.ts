import {createSlice} from '@reduxjs/toolkit';
import {CategoryType} from '../../api/shop';

interface initialState {
  categories: CategoryType[];
  categoryDetail: CategoryType | null;
  error: null | string;
  loading: boolean;
}

const initialState: initialState = {
  categories: [],
  categoryDetail: null,
  loading: false,
  error: null,
};

export const categorySlice = createSlice({
  name: 'Category',
  initialState,
  reducers: {
    requestCategories: state => {
      state.loading = true;
    },
    requestCategoriesSuccess: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    },
    requestCategoryFailed: state => {
      state.loading = false;
      state.error = 'Failed to fetch Category';
    },
    requestCategory: state => {
      state.loading = true;
    },
    requestCategoryDetailSuccess: (state, action) => {
      state.categoryDetail = action.payload;
      state.loading = false;
    },
  },
});

export const {
  requestCategories,
  requestCategoriesSuccess,
  requestCategory,
  requestCategoryFailed,
  requestCategoryDetailSuccess,
} = categorySlice.actions;

export default categorySlice.reducer;
