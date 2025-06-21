import { toast } from "react-toastify";
import axios from "../../axios/axios";
import {
  prescriptionFail,
  prescriptionRequest,
  prescriptionSuccess,
} from "../reducers/prescriptionSlice";

export const asyncCreatePrescription = (formData, id) => async (dispatch) => {
  try {
    dispatch(prescriptionRequest());
    const { data } = await axios.post(`/prescription/create/${id}`, formData);

    dispatch(prescriptionSuccess(data?.data));

    toast.success("Prescription created successfully");
  } catch (error) {
    dispatch(prescriptionFail(error?.response?.data?.message));
    toast.error(
      error?.response?.data?.message || "Fialed to create prescription"
    );
  }
};

export const asyncGetMyPrescription = (userRole) => async (dispatch) => {
  try {
    dispatch(prescriptionRequest());
    let data;
    if (userRole === "admin") {
      data = await axios.get("/prescription/all");
      
      
    } else if (userRole === "doctor" || userRole === "patient") {
      data = await axios.get("/prescription/me");
    }
    dispatch(prescriptionSuccess(data?.data?.data));
    
  } catch (error) {
    dispatch(prescriptionFail(error?.response?.data?.message));
  }
};
export const asyncPrescriptionUpdate = (formData, id) => async (dispatch) => {
  try {
    dispatch(prescriptionRequest());

    const { data } = await axios.patch(`/prescription/update/${id}`, formData);

    dispatch(prescriptionSuccess(data?.data));
    asyncGetMyPrescription();
    toast.success("Prescription Updated Successfully");
  } catch (error) {
    dispatch(prescriptionFail(error?.response?.data?.message));
    toast.error("Error in update prescription");
  }
};
export const asyncPrescriptionDelete = (id, userRole) => async (dispatch) => {
  try {
    dispatch(prescriptionRequest());
    await axios.delete(`/prescription/delete/${id}`);

    dispatch(asyncGetMyPrescription(userRole));

    toast.success("Prescription Deleted Successfully");
  } catch (error) {
    dispatch(prescriptionFail(error?.response?.data?.message));
    toast.error("Error in Delete prescription");
  }
};