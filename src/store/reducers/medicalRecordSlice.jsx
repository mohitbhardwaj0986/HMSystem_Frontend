import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  medicalRecord: [],
  medicalRecordLoading: false,
  error: null,
};

const medicalRecordSlice = createSlice({
  initialState,
  name: "medicalRecord",
  reducers: {
    requestMedicalRecord: (state) => {
      state.error = null;
      state.medicalRecordLoading = true;
    },
    medicalRecordSuccess: (state, action) => {
      state.medicalRecord = action.payload;
      state.medicalRecordLoading = false;
    },
    failMedicalRecord: (state, action) => {
      state.error = action.payload;
      state.medicalRecordLoading = false;
    },
  },
});

export const { failMedicalRecord, medicalRecordSuccess, requestMedicalRecord } =
  medicalRecordSlice.actions;
export default medicalRecordSlice.reducer;
