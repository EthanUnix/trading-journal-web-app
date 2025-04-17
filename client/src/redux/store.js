import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import tradesReducer from './slices/tradesSlice';
import missedTradesReducer from './slices/missedTradesSlice';
import brokerAccountsReducer from './slices/brokerAccountsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trades: tradesReducer,
    missedTrades: missedTradesReducer,
    brokerAccounts: brokerAccountsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
