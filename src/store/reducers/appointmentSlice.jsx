import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointment: [],
  laoding: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    requestAppointment: (state) => {
      state.laoding = true;
      state.error = null;
    },
    appointmentSuccess: (state, action) => {
      state.appointment = action.payload;
      state.laoding = false;
    },
    failAppointment: (state, action) => {
      state.error = action.payload;
      state.laoding = false;
    },
  },
});
export const { appointmentSuccess, failAppointment, requestAppointment } =
  appointmentSlice.actions;
export default appointmentSlice.reducer;
