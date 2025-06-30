import { toast } from "react-toastify";
import axios from "../../axios/axios";
import { requestBill, billSuccess, failBill } from "../reducers/billingSlice";
import { asyncGetAppointment } from "./appointmentAction";

export const asyncCreateBill = (formData, id) => async (dispatch) => {
  try {
    dispatch(requestBill());

    const { data } = await axios.post(`/bill/create/${id}`, formData);

    dispatch(billSuccess([data?.data]));
    toast.success("Bill created successfully");
  } catch (error) {
    const message = error?.response?.data?.message || "Failed to create bill";
    dispatch(failBill(message));
    toast.error(message);
  }
};
export const asyncGetBill = (userRole) => async (dispatch) => {
  try {
    dispatch(requestBill());
    let data;
    if (userRole === "admin") {
      data = await axios.get("/bill/all");
    } else if (userRole === "patient") {
      data = await axios.get("/bill/me");
    }
    dispatch(asyncGetAppointment(userRole))
    dispatch(billSuccess(data?.data?.data));
  } catch (error) {
    dispatch(failBill(error?.response?.data?.message));
  }
};

export const  asyncdeleteBill = (userRole, id) => async (dispatch) => {
  try {
    dispatch(requestBill());
 await axios.delete(`/bill/delete/${id}`);

 dispatch(asyncGetBill(userRole))
    toast.success("Bill Deleted successfully");
  } catch (error) {
    const message = error?.response?.data?.message || "Failed to delete bill";
    dispatch(failBill(message));
    toast.error(message);
  }
};
