import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoginUser } from "../store/actions/userAction";
import Button from "../components/Button";
import LoadingButton from "../components/LoadingButton";
import { useNavigate } from "react-router-dom";
function Login() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
const navigate = useNavigate()
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();
  const SubmitHandler = (data) => {
    dispatch(asyncLoginUser(data,navigate));
    reset();
  };

  return (
    <div className="w-[95vw] h-[90vh] mx-auto rounded-xl flex relative bg-gradient-to-b from-[#bcfcff] to-[#2d9191]">
      <div className="w-[60vw] h-full bg-white py-5">
        <h1 className="text-2xl font-bold text-center">Log In</h1>
        <form
          onSubmit={handleSubmit(SubmitHandler)}
          className="flex flex-col justify-between items-center py"
        >
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
              <small className="text-red-500">{errors.password.message}</small>
            )}
          </div>

          {loading ? (
              <LoadingButton className={`${loading && "bg-[#6d99a3] hover:bg-[#6d99a3]"}`}>
              Login
            </LoadingButton>
          
          ) : (
            <Button
              type="submit"
              className={`px-2 py-1 rounded bg-[#036176]  text-white hover:bg-[#024d5c] transition`}
            >Login</Button>
          )}
        </form>
      </div>
      <div className="w-[40vw] h-full bg-gradient-to-b from-[#bcfcff] to-[#2d9191]"></div>
    </div>
  );
}

export default Login;
