import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { asyncCreateAppointment } from "../store/actions/appointmentAction";
import { useDispatch } from "react-redux";
function AppointmentForm() {
  const { id } = useParams();
  const dispatch = useDispatch();

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
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg bg-gradient-to-b from-[#bcfcff] to-[#f5ffff]">
      <h2 className="text-xl font-bold text-[#036176] mb-4 text-center">
        Book Appointment
      </h2>
      <form onSubmit={handleSubmit(SubmitHandler)} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Appointment Date
          </label>
          <input
            type="date"
            className="px-2 py-1 border-b-2 border-[#036176] outline-none"
            {...register("appointmentDate", { required: "Date is required" })}
          />
          {errors.appointmentDate && (
            <span className="text-red-500 text-sm">
              {errors.appointmentDate.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Time Slot</label>
          <input
            type="text"
            placeholder="10:00 AM - 10:30 AM"
            className="px-2 py-1 border-b-2 border-[#036176] outline-none"
            {...register("timeSlot", { required: "Time slot is required" })}
          />
          {errors.timeSlot && (
            <span className="text-red-500 text-sm">
              {errors.timeSlot.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Reason</label>
          <textarea
            rows={3}
            placeholder="Describe your reason"
            className="px-2 py-1 border-b-2 border-[#036176] outline-none"
            {...register("reason", { required: "Reason is required" })}
          />
          {errors.reason && (
            <span className="text-red-500 text-sm">
              {errors.reason.message}
            </span>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#036176] text-white px-4 py-2 rounded hover:bg-[#024d5c] transition"
          >
            Book Appointment
          </button>
        </div>
      </form>
    </div>
  );
}

export default AppointmentForm;
