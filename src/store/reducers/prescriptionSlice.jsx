import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prescription: [],
  prescriptionLoading: false,
  error: null,
};

const prescriptionSlice = createSlice({
  name: "prescription",
  initialState,
  reducers: {
    prescriptionRequest: (state) => {
      state.error = null;
      state.prescriptionLoading = true;
    },
    prescriptionSuccess: (state, action) => {
      state.prescription = action.payload;
      state.prescriptionLoading = false;
    },
    prescriptionFail: (state, action) => {
      state.error = action.payload;
      state.prescriptionLoading = false;
    },
  },
});
export const { prescriptionFail, prescriptionRequest, prescriptionSuccess } =
  prescriptionSlice.actions;
export default prescriptionSlice.reducer;
