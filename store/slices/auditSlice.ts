import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../lib/api';

export interface AuditLog {
  id: string;
  organization_id: string;
  user_id: string | null;
  action_type: string;
  description: string;
  created_at: string;
  users?: {
    full_name: string;
  } | null;
}

interface AuditState {
  list: AuditLog[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuditState = {
  list: [],
  status: 'idle',
  error: null,
};

export const fetchAuditLogs = createAsyncThunk('audit/fetchAuditLogs', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/audit');
    return response.data.data.logs;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch audit logs');
  }
});

const auditSlice = createSlice({
  name: 'audit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuditLogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAuditLogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchAuditLogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default auditSlice.reducer;
