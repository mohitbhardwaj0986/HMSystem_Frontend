import axios from "../../axios/axios";
import { toast } from "react-toastify";
import {
  userRequest,
  logouotUser,
  userFail,
  userSuccess,
  loadingTrue,
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
    navigate("/");
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
    dispatch(
      userFail(error.response?.data?.data?.message || "Register failed")
    );
  }
};

export const asyncLogout = () => async (dispatch) => {
  try {
    dispatch(userRequest());
    await axios.post("user/logout");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    dispatch(logouotUser());
    toast.success("Logout Successfully");
  } catch (error) {
    dispatch(userFail(error.response?.data?.data?.message));
  }
};

export const asyncUpdateUseDetials = (formData) => async (dispatch) => {
  try {
    dispatch(userRequest());
    const { data } = await axios.patch("/user/update-account", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);

    localStorage.setItem("userInfo", JSON.stringify(data?.data));
    dispatch(userSuccess(data?.data?.user));
    toast.success("Account details updated");
  } catch (error) {
    dispatch(userFail(error.response?.data?.data?.message));
    toast.error("failed in updation");
  }
};

export const asyncChangePassword = (formData) => async (dispatch) => {
  try {
    dispatch(userRequest());
    console.log(data);
    const { data } = await axios.patch("/user/change-password", formData);
    toast.success("Password changed successfully");
    dispatch(loadingTrue());
  } catch (error) {
    console.log(error);

    dispatch(userFail(error.response?.data?.data?.message));
    toast.error(
      error.response?.data?.data?.message ||
        "Failed to change password Try again"
    );
  }
};

export const asyncChangeAvartar = (formData) => async (dispatch) => {
  try {
    dispatch(userRequest());

    const { data } = await axios.patch("/user/update-avatar", formData); 

    toast.success("Avatar changed successfully");
    dispatch(loadingTrue());
  } catch (error) {
    const msg = error.response?.data?.message || "Failed to change avatar";
    dispatch(userFail(msg));
    toast.error(msg);
  }
};

