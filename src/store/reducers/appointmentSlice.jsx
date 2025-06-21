import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointment: [],
  appointmentLaoding: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: "appointment",
  laoding: false,
  error: null,
  initialState,
  reducers: {
    requestAppointment: (state) => {
      state.appointmentLaoding = true;
      state.error = null;
    },
    appointmentSuccess: (state, action) => {
      state.appointment = action.payload;
      state.appointmentLaoding = false;
    },
    failAppointment: (state, action) => {
      state.error = action.payload;
      state.appointmentLaoding = false;
    },
  },
});
export const { appointmentSuccess, failAppointment, requestAppointment } =
  appointmentSlice.actions;
export default appointmentSlice.reducer;
