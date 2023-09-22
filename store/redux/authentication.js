import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    authenticate: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!state.token;
    },
    logout: (state, action) => {
      state.token = null;
      state.isAuthenticated = false;
      AsyncStorage.removeItem("token");
    },
  },
});

export const { authenticate, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
