import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeLatest} from 'redux-saga/effects';
import shop from '../api/shop';
import {
  requestCategoriesSuccess,
  requestCategoryFailed,
  requestCategories,
  requestCategory,
  requestCategoryDetailSuccess,
} from './slices/categorySlice';
import {
  requestProductSuccess,
  requestProductFailed,
  requestProductDetailSuccess,
  requestProducts,
  requestProduct,
} from './slices/productSlice';

function* getAllProducts() {
  try {
    const products: ReturnType<typeof shop.getProducts> = yield call(
      shop.getProducts,
    );
    yield put(requestProductSuccess(products));
  } catch (e) {
    yield put(requestProductFailed());
  }
}

function* getSpecificProduct(action: PayloadAction<any>) {
  const product: ReturnType<typeof shop.getProduct> = yield call(
    shop.getProduct,
    action.payload,
  );
  if (product !== undefined) {
    yield put(requestProductDetailSuccess(product));
  } else {
    yield put(requestProductFailed());
  }
}

function* getAllCategories() {
  try {
    const categories: ReturnType<typeof shop.getCategories> = yield call(
      shop.getCategories,
    );
    yield put(requestCategoriesSuccess(categories));
  } catch (e) {
    yield put(requestCategoryFailed());
  }
}

function* getSpecificCategory(action: PayloadAction<any>) {
  const category: ReturnType<typeof shop.getCategory> = yield call(
    shop.getCategory,
    action.payload,
  );
  if (category) {
    yield put(requestCategoryDetailSuccess(category));
  } else {
    yield put(requestCategoryFailed());
  }
}

function* rootSaga() {
  yield takeLatest(requestProducts, getAllProducts);
  yield takeLatest(requestProduct, getSpecificProduct);
  yield takeLatest(requestCategories, getAllCategories);
  yield takeLatest(requestCategory, getSpecificCategory);
}

export default rootSaga;
