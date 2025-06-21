import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { asyncUpdateMedicalReport } from "../store/actions/medicaReocrdAction";
import { useParams } from "react-router-dom";
import LoadingButton from "../components/LoadingButton";

function MedicalRecordupdateForm() {
  const { user, loading } = useSelector((state) => state.user);
  const { medicalRecord, medicalRecordLoading } = useSelector(
    (state) => state.medicalRecord
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  const userRole = user.role;
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(asyncUpdateMedicalReport(data, id, userRole));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gradient-to-b from-[#bcfcff] to-[#f5ffff] bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto border-l-4 border-[#024D5C]"
    >
      <h2 className="text-2xl font-bold text-[#024D5C] mb-4 text-center">
        Update Medical Record
      </h2>

      {/* Symptoms */}
      <div className="flex flex-col pb-3">
        <label className="text-[#036176]">Symptoms</label>
        <input
          type="text"
          placeholder="e.g., fever, cough"
          className="outline-0 px-3 py-2 border-b-2 border-[#036176]"
          {...register("symptoms", { required: "Symptoms are required" })}
        />
        {errors.symptoms && (
          <small className="text-red-500">{errors.symptoms.message}</small>
        )}
      </div>

      {/* Diagnosis */}
      <div className="flex flex-col pb-3">
        <label className="text-[#036176]">Diagnosis</label>
        <input
          type="text"
          placeholder="e.g., viral fever"
          className="outline-0 px-3 py-2 border-b-2 border-[#036176]"
          {...register("diagnosis", { required: "Diagnosis is required" })}
        />
        {errors.diagnosis && (
          <small className="text-red-500">{errors.diagnosis.message}</small>
        )}
      </div>

      {/* Tests */}
      <div className="flex flex-col pb-3">
        <label className="text-[#036176]">Tests (comma-separated)</label>
        <input
          type="text"
          placeholder="e.g., Blood Test, X-Ray"
          className="outline-0 px-3 py-2 border-b-2 border-[#036176]"
          {...register("tests")}
        />
      </div>

      {/* Notes */}
      <div className="flex flex-col pb-3">
        <label className="text-[#036176]">Notes</label>
        <textarea
          placeholder="Additional notes..."
          className="outline-0 px-3 py-2 border-2 border-[#036176] rounded resize-none"
          rows={4}
          {...register("notes")}
        />
      </div>

      {!medicalRecordLoading ? (
        <button
          type="submit"
          className="bg-[#024D5C] text-white px-4 py-2 rounded hover:bg-[#013f4a] mt-4"
        >
          Update Record
        </button>
      ) : (
        <LoadingButton />
      )}
    </form>
  );
}

export default MedicalRecordupdateForm;
