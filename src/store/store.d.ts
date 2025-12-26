import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import locationReducer from './locationSlice';

declare const store: ReturnType<typeof configureStore<{
  user: ReturnType<typeof userReducer>;
  location: ReturnType<typeof locationReducer>;
}>>;

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
