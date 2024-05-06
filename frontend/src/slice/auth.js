// features/registerSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const registerSlice = createSlice({
  name: 'register',
  initialState: {
    // Define the initial state of the registration feature
    isLogged: false,
    message: "",
    user: "",
    token:"",
    isAdmin:null
  },
  reducers: {
    // Define reducers to handle actions
    registerRequest: (state) => {
      state.isLoading = true;
    },
    registerSuccess: (state, action) => {
      state.isLogged = action.payload.isLogged
      state.user = action.payload;
      state.token = action.payload.token;
      state.message = action.payload.message
      state.isAdmin = action.payload.isAdmin
    },
    registerFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Export the action creators and the reducer
export const { registerRequest, registerSuccess, registerFailure } = registerSlice.actions;
export default registerSlice.reducer;
