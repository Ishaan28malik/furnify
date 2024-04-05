import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {CategoryType} from '../../api/shop';

interface initialState {
  categories: CategoryType[];
  categoryDetail: CategoryType | null;
  error: null | string;
  loading: boolean;
}

const initialState: initialState = {
  categories: [],
  categoryDetail: {"id": 1, "name": "Sofas"},
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
    requestCategoriesSuccess: (
      state,
      action: PayloadAction<CategoryType[]>,
    ) => {
      state.categories = action.payload;
      state.loading = false;
    },
    requestCategoryFailed: state => {
      state.loading = false;
      state.error = 'Failed to fetch Category';
    },
    requestCategory: (state, action) => {
      state.loading = true;
    },
    requestCategoryDetailSuccess: (
      state,
      action: PayloadAction<CategoryType>,
    ) => {
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
