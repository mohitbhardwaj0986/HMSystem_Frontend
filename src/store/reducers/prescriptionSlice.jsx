import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prescriptions: [],
};

const prescriptionSlice = createSlice({
  name: "prescription",
  initialState,
  reducers: {},
});

export default prescriptionSlice.reducer;
