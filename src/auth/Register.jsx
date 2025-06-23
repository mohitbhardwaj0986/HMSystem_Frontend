import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { asyncRegisterUser } from "../store/actions/userAction";
import Button from "../components/Button";
import LoadingButton from "../components/LoadingButton";
import registerImg from "../assets/register.jpg"

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
    <div className="w-[95vw] h-[90vh] mx-auto flex rounded-2xl overflow-hidden shadow-2xl">
  {/* Left: Sign Up Form */}
  <motion.div
    className="w-[60vw] h-full bg-white p-8 flex flex-col justify-center"
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <h1 className="text-3xl font-bold text-center text-[#024D5C] mb-8">
      Create Account
    </h1>

    <form
      onSubmit={handleSubmit(SubmitHandler)}
      className="flex flex-col items-center gap-6"
    >
      {/* Full Name */}
      <div className="flex flex-col w-full max-w-sm">
        <label className="text-sm text-gray-600">Full Name</label>
        <input
          type="text"
          placeholder="Mohit Bhardwaj"
          className="outline-none px-3 py-2 border-b-2 border-[#036176] focus:border-[#024D5C] transition"
          {...register("fullName", { required: "Name is required" })}
        />
        {errors.fullName && (
          <small className="text-red-500 mt-1">{errors.fullName.message}</small>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col w-full max-w-sm">
        <label className="text-sm text-gray-600">Email</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          className="outline-none px-3 py-2 border-b-2 border-[#036176] focus:border-[#024D5C] transition"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <small className="text-red-500 mt-1">{errors.email.message}</small>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col w-full max-w-sm">
        <label className="text-sm text-gray-600">Password</label>
        <input
          type="password"
          placeholder="*****"
          className="outline-none px-3 py-2 border-b-2 border-[#036176] focus:border-[#024D5C] transition"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <small className="text-red-500 mt-1">
            {errors.password.message}
          </small>
        )}
      </div>

      {/* Role */}
      <div className="flex flex-col w-full max-w-sm">
        <label className="text-sm text-gray-600">Role</label>
        <select
          {...register("role")}
          className="outline-none px-3 py-2 border-b-2 border-[#036176] bg-white focus:border-[#024D5C] transition"
        >
          <option value="">Select</option>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
      </div>

      {/* Submit */}
      {loading ? (
        <LoadingButton className="bg-[#6d99a3] hover:bg-[#6d99a3]">
          Signing up...
        </LoadingButton>
      ) : (
        <Button
          type="submit"
          className="bg-[#036176] text-white px-6 py-2 rounded hover:bg-[#024d5c] transition"
        >
          Sign up
        </Button>
      )}
    </form>
  </motion.div>

  {/* Right: Illustration or Gradient */}
  <motion.div
    className="w-[40vw] h-full bg-gradient-to-b from-[#bcfcff] to-[#2d9191] flex items-center justify-center"
    initial={{ x: 100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <img
      src={registerImg}
      alt=""
      className="w-full h-full object-cover"
    />
  </motion.div>
</div>
  );
}

export default Register;
