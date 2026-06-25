import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Document } from '../../domain/entities/Document';

interface DocumentsState {
  items: Document[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DocumentsState = {
  items: [],
  isLoading: false,
  error: null,
};

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    addDocument: (state, action: PayloadAction<Document>) => {
      state.items.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { addDocument, setLoading, setError } = documentsSlice.actions;
export default documentsSlice.reducer;
