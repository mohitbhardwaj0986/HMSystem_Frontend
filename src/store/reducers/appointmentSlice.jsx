import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointments: [],
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {},
});

export default appointmentSlice.reducer
