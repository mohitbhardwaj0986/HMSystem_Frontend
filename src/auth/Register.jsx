import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { asyncRegisterUser } from "../store/actions/userAction";
import Button from "../components/Button";
import LoadingButton from "../components/LoadingButton";

function Register() {
  const { user, loading, error } = useSelector((state) => state.user);
const dispatch = useDispatch()
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();
  const SubmitHandler = (data) => {
    console.log(data);
    dispatch(asyncRegisterUser(data))
    reset()
  };
  return (
    <div className="w-[95vw] h-[90vh] mx-auto rounded-xl flex relative bg-gradient-to-b from-[#bcfcff] to-[#2d9191]">
      <div className="w-[60vw] h-full bg-white py-5">
        <h1 className="text-2xl font-bold text-center">Create Account</h1>
        <form onSubmit={handleSubmit(SubmitHandler)} className="flex flex-col justify-between items-center py">
         <div className="flex flex-col pb-3">
            <label>Full name</label>
            <input
              type="text"
              placeholder="Mohit bhardwaj"
              className="outline-0 px-2 py-1 border-b-2 border-[#036176]"
              {...register("fullName", { required: "Name is required" })}
            />
            {errors.fullName && (
              <small className="text-red-500">{errors.fullName.message}</small>
            )}
            </div >
            <div className="flex flex-col pb-3">
              <label>Email</label>
              <input
                type="email"
                placeholder="example@gmai.com"
                     className="outline-0 px-2 py-1 border-b-2 border-[#036176]"
                {...register("email", { required: "email is required" })}
              />
              {errors.email && (
                <small className="text-red-500">{errors.email.message}</small>
              )}
            </div>
            <div className="flex flex-col pb-3">
              <label>Password</label>
              <input
                type="password"
                placeholder="*****"
                     className="outline-0 px-2 py-1 border-b-2 border-[#036176]"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <small className="text-red-500">
                  {errors.password.message}
                </small>
              )}
            </div>
            <div className="flex flex-col pb-3">
              <label>Role</label>
              <select {...register("role")}>
                <option value="">Select</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
           {loading ? (
              <LoadingButton className={`${loading && "bg-[#6d99a3] hover:bg-[#6d99a3]"}`}>
              Sign up
            </LoadingButton>
          
          ) : (
            <Button
              type="submit"
              className={`px-2 py-1 rounded bg-[#036176]  text-white hover:bg-[#024d5c] transition`}
            >Sign up</Button>
          )}
        
        </form>
      </div>
      <div className="w-[40vw] h-full bg-gradient-to-b from-[#bcfcff] to-[#2d9191]"></div>
    </div>
  );
}

export default Register;
