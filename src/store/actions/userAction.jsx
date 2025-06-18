import axios from "../../axios/axios";
import { toast } from "react-toastify";
import {
  userRequest,
  logouotUser,
  userFail,
  userSuccess,
} from "../reducers/userSlice";

export const asyncLoginUser = (formData, navigate) => async (dispatch) => {
  try {
    dispatch(userRequest());
    const { data } = await axios.post("user/login", formData);
    console.log(data?.data);
    localStorage.setItem("accessToken", data?.data?.accessToken);
    localStorage.setItem("userInfo", JSON.stringify(data?.data?.user));
    dispatch(userSuccess(data?.data?.user));
    toast.success("Login successful!");
    navigate("/")
  } catch (error) {
    dispatch(userFail(error.response?.data?.message || "Login failed"));
    toast.error("Login failed Try Again");
  }
};

export const asyncRegisterUser = (formData) => async (dispatch) => {
  try {
    const { data } = await axios.post("user/register", formData);
    toast.success("Register Successfully!, Please login");
  } catch (error) {
    dispatch(userFail(error.response?.data?.data?.message || "Register failed"));
  }
};


export const asyncLogout = ()=> async (dispatch) => {
  try {
   dispatch(userRequest())
   await axios.post('user/logout')
   localStorage.removeItem("accessToken")
   localStorage.removeItem("userInfo")
   dispatch(logouotUser())
   toast.success("Logout Successfully")
  } catch (error) {
      dispatch(userFail(error.response?.data?.data?.message))
  }
}