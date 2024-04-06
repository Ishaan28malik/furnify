import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import productSlice from './slices/productSlice';
import categorySlice from './slices/categorySlice';
import cartSlice from './slices/cartSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whiteList: ['cart'],
};

const rootReducer = combineReducers({
  product: productSlice,
  category: categorySlice,
  cart: cartSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    //ref: https://github.com/reduxjs/redux-toolkit/issues/1831#issuecomment-1007857548
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        thunk: false,
      }).concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

const store = makeStore();

const persistor = persistStore(store);
export {persistor, store};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
