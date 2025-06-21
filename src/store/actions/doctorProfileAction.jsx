import { toast } from "react-toastify";
import axios from "../../axios/axios";
import {
  doctorProfileSuccess,
  failDoctorProfile,
  requestDoctorProfile,
  singleDoctorProfileSuccess,
} from "../reducers/doctorProfileSlice";
import Profile from "../../pages/Profile";
export const asyncGetAllDoctorProfile = () => async (dispatch) => {
  try {
    dispatch(requestDoctorProfile());
    const { data } = await axios.get("doctorprofile/all-doctors");
    dispatch(doctorProfileSuccess(data?.data));
  } catch (error) {
    dispatch(
      failDoctorProfile(
        error.response?.data?.message || "failed to load doctor profile"
      )
    );
  }
};

export const asyncSingledoctorProfile = (id) => async (dispatch) => {
  try {
    dispatch(requestDoctorProfile());

    const { data } = await axios.get(`/doctorprofile/singledoctor/${id}`);
    dispatch(singleDoctorProfileSuccess(data?.data));
  } catch (error) {
    dispatch(failDoctorProfile(error.response.data.message));
  }
};
export const asyncCreatedoctorProfile = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    
    dispatch(requestDoctorProfile());
    await axios.post(`/doctorprofile/create`, formData);
    dispatch(asyncGetAllDoctorProfile());
    toast.success("Doctor Profile created")
  } catch (error) {
    dispatch(failDoctorProfile(error.response.data.message));
    toast.error("Failed to create profile try again")
  }
};
export const asyncDeletedoctorProfile = (navigate) => async (dispatch) => {
  try {
    
    dispatch(requestDoctorProfile());
    await axios.delete("/doctorprofile/delete");
    dispatch(asyncGetAllDoctorProfile());
    dispatch(asyncSingledoctorProfile());
    navigate("/profile")
    toast.success("Doctor Profile deleted")
  } catch (error) {
    dispatch(failDoctorProfile(error.response.data.message));
    toast.error("Failed to delete profile try again")
  }
};
