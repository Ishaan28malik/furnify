import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeLatest} from 'redux-saga/effects';
import shop from '../api/shop';
import {
  requestCategoriesSuccess,
  requestCategoryFailed,
  requestCategories,
  requestCategory,
} from './slices/categorySlice';
import {
  requestProductSuccess,
  requestProductFailed,
  requestProductDetailSuccess,
  requestProducts,
  requestProduct,
} from './slices/productSlice';

function* getAllProducts(): Generator {
  try {
    const products = yield call(shop.getProducts);
    yield put(requestProductSuccess(products));
  } catch (e) {
    yield put(requestProductFailed());
  }
}

function* getSpecificProduct(action: PayloadAction<number>): Generator {
  const product = yield call(shop.getProduct, action.payload);
  if (product !== undefined) {
    yield put(requestProductDetailSuccess(product));
  } else {
    yield put(requestProductFailed());
  }
}

function* getAllCategories(): Generator {
  try {
    const categories = yield call(shop.getCategories);
    yield put(requestCategoriesSuccess(categories));
  } catch (e) {
    yield put(requestCategoryFailed());
  }
}

function* getSpecificCategory(action: PayloadAction<number>): Generator {
  const category = yield call(shop.getCategory, action.payload);
  if (category !== undefined) {
    yield put(requestCategoriesSuccess(category));
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
