import axios from "../../axios/axios";
import {
  doctorProfileSuccess,
  failDoctorProfile,
  requestDoctorProfile,
  singleDoctorProfileSuccess,
} from "../reducers/doctorProfileSlice";

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
