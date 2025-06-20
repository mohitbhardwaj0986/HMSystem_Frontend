import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { asyncCreateAppointment } from "../store/actions/appointmentAction";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "../components/LoadingButton"
function AppointmentForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { appointmentLaoding } = useSelector(
    (state) => state.appointment
  );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const SubmitHandler = (data) => {
    dispatch(asyncCreateAppointment(data, id));
    reset();
  };
  return (
    <div>
      <form
      onSubmit={handleSubmit(SubmitHandler)}
      className="bg-white p-6 rounded shadow-md max-w-xl mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold text-center text-[#024D5C] mb-4">
        Doctor Profile Form
      </h2>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Specialization</label>
        <input
          type="text"
          placeholder="Cardiologist"
          className="px-2 py-1 border-b-2 border-[#036176] outline-none"
          {...register("specialization", { required: "Specialization is required" })}
        />
        {errors.specialization && (
          <span className="text-red-500 text-sm">
            {errors.specialization.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Experience (Years)</label>
        <input
          type="number"
          placeholder="5"
          className="px-2 py-1 border-b-2 border-[#036176] outline-none"
          {...register("experience", { required: "Experience is required", min: 0 })}
        />
        {errors.experience && (
          <span className="text-red-500 text-sm">
            {errors.experience.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Education</label>
        <input
          type="text"
          placeholder="MBBS, MD"
          className="px-2 py-1 border-b-2 border-[#036176] outline-none"
          {...register("education", { required: "Education details are required" })}
        />
        {errors.education && (
          <span className="text-red-500 text-sm">
            {errors.education.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Consultation Fee (INR)</label>
        <input
          type="number"
          placeholder="500"
          className="px-2 py-1 border-b-2 border-[#036176] outline-none"
          {...register("consultationFee", { required: "Consultation fee is required" })}
        />
        {errors.consultationFee && (
          <span className="text-red-500 text-sm">
            {errors.consultationFee.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Start Time</label>
        <input
          type="time"
          className="px-2 py-1 border-b-2 border-[#036176] outline-none"
          {...register("timings.start", { required: "Start time is required" })}
        />
        {errors.timings?.start && (
          <span className="text-red-500 text-sm">
            {errors.timings.start.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">End Time</label>
        <input
          type="time"
          className="px-2 py-1 border-b-2 border-[#036176] outline-none"
          {...register("timings.end", { required: "End time is required" })}
        />
        {errors.timings?.end && (
          <span className="text-red-500 text-sm">
            {errors.timings.end.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Bio</label>
        <textarea
          rows="3"
          placeholder="Write something about yourself..."
          className="px-2 py-1 border-b-2 border-[#036176] outline-none"
          {...register("bio")}
        ></textarea>
      </div>

      <div className="text-center">
        <button
          type="submit"
          disabled={appointmentLaoding}
          className="bg-[#024D5C] text-white px-6 py-2 rounded hover:bg-[#013f4a]"
        >
          {appointmentLaoding ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </form>
    </div>
  );
}

export default AppointmentForm;
