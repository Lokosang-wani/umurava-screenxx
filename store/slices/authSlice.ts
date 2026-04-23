import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../lib/api';

export interface User {
  id: string;
  organization_id: string;
  full_name: string;
  email: string;
  role: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  organization: any | null; // Can refine type later
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  // Check if token exists in localStorage to set initial state synchronously if possible
  // However, localStorage is not available during SSR, so we default to false/null
  // and re-hydrate on client mount.
  isAuthenticated: false, 
  user: null,
  organization: null,
  isLoading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/auth/me');
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    setAuthSuccess(state, action: PayloadAction<{ user: User; organization?: any; token: string }>) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      if (action.payload.organization) {
        state.organization = action.payload.organization;
      }
      state.isLoading = false;
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token);
      }
    },
    setAuthFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.organization = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    },
    hydrateAuth(state, action: PayloadAction<{ user: User }>) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<{ user: User; organization?: any }>) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        if (action.payload.organization) {
          state.organization = action.payload.organization;
        }
        state.isLoading = false;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { setAuthStart, setAuthSuccess, setAuthFailure, logout, hydrateAuth } = authSlice.actions;
export default authSlice.reducer;
