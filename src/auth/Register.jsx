import React from "react";
import { useForm } from "react-hook-form";

function Register() {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();
  return (
    <div className="w-[95vw] h-[90vh] mx-auto rounded-xl flex relative bg-gradient-to-b from-[#bcfcff] to-[#2d9191]">
      <div className="w-[60vw] h-full bg-white py-5">
        <h1 className="text-2xl font-bold text-center">Create Account</h1>
        <form>
          <input type="text"  />
        </form>
      </div>
      <div className="w-[40vw] h-full bg-gradient-to-b from-[#bcfcff] to-[#2d9191]"></div>
    </div>
  );
}

export default Register;
