import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/login/authReducer';
import profileReducer from './reducers/login/modal/profileReducer';
import urlReducer from './reducers/urlSlice';
import chatReducer from './reducers/ai/aiChatReducer';
import searchReducer from './reducers/common/searchReducer';
import healthReducer from './reducers/health/healthReducer';
import exerciseTrackingReducer from './reducers/health/modal/exerciseTrackingReducer';
import mealLogReducer from './reducers/health/modal/mealLogReducer';
import sleepTrackingReducer from './reducers/health/modal/sleepTrackingReducer';
import financeReducer from './reducers/finance/financeReducer';
import transactionReducer from './reducers/finance/transactionReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    url: urlReducer,
    chat: chatReducer,
    search: searchReducer,
    health: healthReducer,
    finance: financeReducer,
    transaction: transactionReducer,
    exerciseTracking: exerciseTrackingReducer, // 추가
    mealLog: mealLogReducer, // 추가
    sleepTracking: sleepTrackingReducer, // 추가
    profile: profileReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat([])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;