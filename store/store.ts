import { configureStore, createSlice } from '@reduxjs/toolkit';

// Placeholder slice — will be replaced with real slices (jobs, applicants, screening)
const appSlice = createSlice({
  name: 'app',
  initialState: { initialized: true },
  reducers: {},
});

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    // Add more slices here: jobs, applicants, screening
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
