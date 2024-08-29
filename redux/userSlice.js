import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  currentUser: null,
  purchaseHistory: [],
  error: null,
};

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
    },
    addPurchase: (state, action) => {
      state.purchaseHistory.push(action.payload);
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.purchaseHistory = [];
      state.error = null;
    },
  },
});

// Export actions
export const { setUser, addPurchase, loginSuccess, loginFailure, logout } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
