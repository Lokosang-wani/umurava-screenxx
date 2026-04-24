import { configureStore, createSlice } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import jobsReducer from './slices/jobsSlice';
import applicantsReducer from './slices/applicantsSlice';
import notificationsReducer from './slices/notificationsSlice';
import interviewsReducer from './slices/interviewsSlice';
import auditReducer from './slices/auditSlice';

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
    notifications: notificationsReducer,
    interviews: interviewsReducer,
    audit: auditReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
