import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bills: [],
  billLoading: false,
  error: null,
};

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    requestBill: (state) => {
      state.billLoading = true;
      state.error = null;
    },
    billSuccess: (state, action) => {
      state.bills = action.payload;
      state.billLoading = false;
    },
    failBill: (state, action) => {
      state.error = action.payload;
      state.billLoading = false;
    },
  },
});

export const { requestBill, billSuccess, failBill } = billSlice.actions;
export default billSlice.reducer;
