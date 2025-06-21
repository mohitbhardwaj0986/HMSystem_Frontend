import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./reducers/userSlice"
import appointmentSlice from "./reducers/appointmentSlice"
import doctorProfileSlice from "./reducers/doctorProfileSlice"
import prescriptionSlice from "./reducers/prescriptionSlice"
import billingSlice from "./reducers/billingSlice"
import notificationSlice from "./reducers/notificationSlice"
import medicalRecordSlice from "./reducers/medicalRecordSlice"

export const store = configureStore({
    reducer:{
        user:userSlice,
        appointment:appointmentSlice,
        doctorProfile:doctorProfileSlice,
        prescription:prescriptionSlice,
        bill:billingSlice,
        notification:notificationSlice,
        medicalRecord:medicalRecordSlice
    },

})