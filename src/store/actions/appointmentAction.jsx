import { failAppointment, appointmentSuccess, requestAppointment } from "../reducers/appointmentSlice"
import axios from "../../axios/axios"
import {toast} from "react-toastify"

export const asyncCreateAppointment = (FormData,id )=> async(dispatch) => {
    try {
        
        dispatch(requestAppointment())
        const {data} = await axios.post(`/appointment/create/${id}`,FormData)
        console.log("chala");
    
        dispatch(appointmentSuccess(data?.data))
        toast.success("Appointment created")
    } catch (error) {
        dispatch(failAppointment(error.response.data.message))
        toast.error("Failed Appointment")

    }
}