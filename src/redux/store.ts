import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/login/authReducer';
import urlReducer from './reducers/urlSlice';
import chatReducer from './reducers/ai/aiReducer';
import searchReducer from './reducers/common/searchReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    url: urlReducer,
    chat: chatReducer,
    search: searchReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat([])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;