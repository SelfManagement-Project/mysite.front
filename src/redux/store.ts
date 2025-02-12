import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import urlReducer from './reducers/urlSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    url: urlReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat([])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;