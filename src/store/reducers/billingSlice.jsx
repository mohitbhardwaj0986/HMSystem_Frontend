import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bills: [],
};

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {},
});


export default billSlice.reducer;