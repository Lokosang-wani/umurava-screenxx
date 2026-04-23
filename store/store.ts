import { configureStore, createSlice } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import jobsReducer from './slices/jobsSlice';
import applicantsReducer from './slices/applicantsSlice';

// Placeholder slice — will be replaced with real slices (jobs, applicants, screening)
const appSlice = createSlice({
  name: 'app',
  initialState: { initialized: true },
  reducers: {},
});

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    auth: authReducer,
    jobs: jobsReducer,
    applicants: applicantsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
