import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { asyncCreateAppointment } from "../store/actions/appointmentAction";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "../components/LoadingButton";
function AppointmentForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { appointmentLaoding } = useSelector((state) => state.appointment);

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
          Book Appointment
        </h2>

        {/* Appointment Date */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Appointment Date
          </label>
          <input
            type="date"
            {...register("appointmentDate", {
              required: "Appointment date is required",
            })}
            className="px-2 py-1 border-b-2 border-[#036176] outline-none"
          />
          {errors.appointmentDate && (
            <span className="text-red-500 text-sm">
              {errors.appointmentDate.message}
            </span>
          )}
        </div>

        {/* Time Slot */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Time Slot</label>
          <select
            {...register("timeSlot", { required: "Time slot is required" })}
            className="px-2 py-1 border-b-2 border-[#036176] outline-none"
          >
            <option value="">-- Select a time slot --</option>
            {[
              "10:00 AM - 10:30 AM",
              "10:30 AM - 11:00 AM",
              "11:00 AM - 11:30 AM",
              "11:30 AM - 12:00 PM",
            ].map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.timeSlot && (
            <span className="text-red-500 text-sm">
              {errors.timeSlot.message}
            </span>
          )}
        </div>

        {/* Reason */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Reason (Optional)
          </label>
          <textarea
            rows="3"
            placeholder="Describe your reason for the appointment..."
            {...register("reason")}
            className="px-2 py-1 border-b-2 border-[#036176] outline-none"
          ></textarea>
        </div>

        {/* (Optional) Status Field - if you want to allow manual status set */}
        {/* <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700">Status</label>
    <select
      {...register("status")}
      className="px-2 py-1 border-b-2 border-[#036176] outline-none"
      defaultValue="pending"
    >
      <option value="pending">Pending</option>
      <option value="confirmed">Confirmed</option>
      <option value="completed">Completed</option>
      <option value="cancelled">Cancelled</option>
    </select>
  </div> */}

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#024D5C] text-white px-6 py-2 rounded hover:bg-[#013f4a]"
          >
            Book Appointment
          </button>
        </div>
      </form>
    </div>
  );
}

export default AppointmentForm;
