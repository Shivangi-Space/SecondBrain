import { configureStore } from '@reduxjs/toolkit';
import documentsReducer from './slices/documentsSlice';
import chatReducer from './slices/chatSlice';

export const store = configureStore({
  reducer: {
    documents: documentsReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
