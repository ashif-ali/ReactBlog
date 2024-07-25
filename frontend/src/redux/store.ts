import {configureStore, createSlice} from "@reduxjs/toolkit";

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

const authSlice = createSlice({
  name: "auth",
  initialState: {isLoggedIn: false},
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("userId");
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

const store = configureStore({
  reducer: authSlice.reducer,
});

export default store;
