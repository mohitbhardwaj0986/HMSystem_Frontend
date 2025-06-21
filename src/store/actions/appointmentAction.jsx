import {
  failAppointment,
  appointmentSuccess,
  requestAppointment,
} from "../reducers/appointmentSlice";
import axios from "../../axios/axios";
import { toast } from "react-toastify";
export const asyncCreateAppointment = (FormData, id) => async (dispatch) => {
  try {
    dispatch(requestAppointment());
    const { data } = await axios.post(`/appointment/create/${id}`, FormData);
    console.log("chala");

    dispatch(appointmentSuccess(data?.data));
    toast.success("Appointment created");
  } catch (error) {
    dispatch(failAppointment(error.response.data.message));
    toast.error("Failed Appointment");
  }
};

export const asyncGetAppointment = (userRole) => async (dispatch) => {
  try {
    dispatch(requestAppointment());
    let data;
    if (userRole === "doctor") {
      data = await axios.get("/appointment/doctor-appointments");
      
    } else if (userRole === "patient") {
      data = await axios.get("/appointment/my-appointments");
      
      
    } else {
      data = await axios.get("/appointment/all");
    }

    dispatch(appointmentSuccess(data?.data?.data));
  } catch (error) {
    dispatch(failAppointment(error?.response?.data?.message));
   
  }
};

export const asyncAppointmentDelete = (id) => async (dispatch) =>{
    try {
        dispatch(requestAppointment());
      await axios.delete(`/appointment/delete/${id}`)
       
        dispatch(asyncGetAppointment());
        toast.success("Successfully Deleted Appointment");
    } catch (error) {
            dispatch(failAppointment(error?.response?.data?.message))
             toast.error("Failed to delete Appointment");
    }
}