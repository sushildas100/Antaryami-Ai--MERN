// import { createSlice } from "@reduxjs/toolkit";

// const loginValue = localStorage.getItem("isLogin") || false;

// const authInitialState = { isLogin: loginValue };

// const authSlice = createSlice({
//   name: "auth slice",
//   initialState: authInitialState,
//   reducers: {
//     isLoginHandler(state, action) {
//       state.isLogin = action.payload.isLogin;
//     },
//   },
// });

// export const authAction = authSlice.actions;

// export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define an async thunk to fetch the user ID
export const getUserIdAsync = createAsyncThunk(
  'auth/getUserIdAsync',
  async () => {
    // Logic to fetch user ID, for example, from an API
    const response = await fetch('your-api-endpoint-for-getting-user-id');
    const data = await response.json();
    return data.userId; // Assuming your API response contains the user ID
  }
);

const loginValue = localStorage.getItem("isLogin") || false;

const authInitialState = { isLogin: loginValue, userId: null }; // Initialize userId to null

const authSlice = createSlice({
  name: "auth slice",
  initialState: authInitialState,
  reducers: {
    isLoginHandler(state, action) {
      state.isLogin = action.payload.isLogin;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserIdAsync.fulfilled, (state, action) => {
      state.userId = action.payload; // Set userId when the async thunk is fulfilled
    });
  },
});

export const authAction = { ...authSlice.actions, getUserIdAsync }; // Include getUserIdAsync in authAction

export default authSlice.reducer;
