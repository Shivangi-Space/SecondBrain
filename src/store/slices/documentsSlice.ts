import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Document {
  id: string;
  title: string;
  status: 'pending' | 'processed' | 'error';
}

interface DocumentsState {
  items: Document[];
  loading: boolean;
}

const initialState: DocumentsState = { items: [], loading: false };

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    addDocument: (state, action: PayloadAction<Document>) => {
      state.items.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { addDocument, setLoading } = documentsSlice.actions;
export default documentsSlice.reducer;
