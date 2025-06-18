import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctorProfile: [],
  singleDoctorProfile: {},
  loading: false,
  error: null,
};

const doctorProfileSlice = createSlice({
  name: "doctorProfile",
  initialState,
  reducers: {
    requestDoctorProfile: (state) => {
      state.loading = true;
      state.error = null;
    },
    doctorProfileSuccess: (state, action) => {
      state.doctorProfile = action.payload;
      state.loading = false;
    },
    singleDoctorProfileSuccess: (state, action) => {
      state.singleDoctorProfile = action.payload;
      state.loading = false;
    },
    failDoctorProfile: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});
export const {
  requestDoctorProfile,
  doctorProfileSuccess,
  failDoctorProfile,
  singleDoctorProfileSuccess,
} = doctorProfileSlice.actions;
export default doctorProfileSlice.reducer;
