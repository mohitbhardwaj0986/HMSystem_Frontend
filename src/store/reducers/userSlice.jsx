import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  user: userInfoFromStorage,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    userSuccess: (state, action) => {
      state.user = action.payload;

      state.loading = false;
    },
    userFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logouotUser: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export default userSlice.reducer;
export const { userRequest, userSuccess, userFail, logouotUser } =
  userSlice.actions;
