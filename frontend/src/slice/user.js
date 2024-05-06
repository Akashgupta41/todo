// features/registerSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    // Define the initial state of the registration feature
   allUsers: null
  },
  reducers: {
    // Define reducers to handle actions
    
    userSuccess: (state, action) => {
      state.allUsers = action.payload
    },
    
  },
});

// Export the action creators and the reducer
export const { userSuccess} = userSlice.actions;
export default userSlice.reducer;
