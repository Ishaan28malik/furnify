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

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  product: productSlice,
  category: categorySlice,
});

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        thunk: false,
      }).concat(sagaMiddleware),
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

const store = makeStore();

const persistor = persistStore(store);
export {persistor, store};

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
