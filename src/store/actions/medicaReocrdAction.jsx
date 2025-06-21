import { toast } from "react-toastify";
import {
  failMedicalRecord,
  medicalRecordSuccess,
  requestMedicalRecord,
} from "../reducers/medicalRecordSlice";
import axios from "../../axios/axios";

export const asyncCreateMedicalRecord = (formData, id) => async (dispatch) => {
  try {
    dispatch(requestMedicalRecord());
    const { data } = await axios.post(`/medicalrecord/create/${id}`, formData);
    dispatch(medicalRecordSuccess(data?.data));
    toast.success("Medical Record create Successfully");
  } catch (error) {
    dispatch(failMedicalRecord(error.response.data.message));
    toast.error("Failed to create medical record");
  }
};

export const asyncgetMedicalRecord = (userRole) => async (dispatch) => {
  try {
    dispatch(requestMedicalRecord());
    let data;
    if (userRole === "patient" || userRole === "doctor") {
      data = await axios.get(`/medicalrecord/patientordoctor`);
    } else {
      data = await axios.get(`/medicalrecord/all`);
    }
    dispatch(medicalRecordSuccess(data?.data?.data));
  } catch (error) {
    dispatch(failMedicalRecord(error.response.data.message));
  }
};

export const asyncDeleteMedicalReport = (id, userRole) => async (dispatch) => {
  try {
    dispatch(requestMedicalRecord());
 await axios.delete(`/medicalrecord/delete/${id}`);
    dispatch(asyncgetMedicalRecord(userRole))
    toast.success("Medical Record Deleted Successfully");
  } catch (error) {
    dispatch(failMedicalRecord(error.response.data.message));
    toast.error("Failed to delete medical record");
  }
};

export const asyncUpdateMedicalReport = (formData,id, userRole) => async (dispatch) => {
  try {
    dispatch(requestMedicalRecord());
 await axios.patch(`/medicalrecord/update/${id}`, formData);
    dispatch(asyncgetMedicalRecord(userRole))
    toast.success("Medical Record updated Successfully");
  } catch (error) {
    dispatch(failMedicalRecord(error.response.data.message));
    toast.error("Failed to update medical record");
  }
};