import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { asyncCreateMedicalRecord } from "../store/actions/medicaReocrdAction";
import LoadingButton from "../components/LoadingButton";

function MedicalRecordForm() {
  const { medicalRecord, medicalRecordLoading } = useSelector(
    (state) => state.medicalRecord
  );
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const medicalRecordSubmit = (data) => {
    dispatch(asyncCreateMedicalRecord(data, id));
    reset();
  };
  return (
    <div className=" py-5">
      <form
        onSubmit={handleSubmit(medicalRecordSubmit)}
        className="max-w-lg mx-auto p-4 bg-white shadow rounded bg-gradient-to-b  from-[#bcfcff] to-[#f5ffff]"
      >
        <h1 className="text-center text-xl font-semibold text-[#036176]">
          Medical Record Form
        </h1>
        <div className="flex flex-col pb-3">
          <label>Symptoms</label>
          <input
            type="text"
            placeholder="e.g. Fever, Headache"
            className="outline-0 px-2 py-1 border-b-2 border-[#036176]"
            {...register("symptoms", { required: "Symptoms are required" })}
          />
          {errors.symptoms && (
            <small className="text-red-500">{errors.symptoms.message}</small>
          )}
        </div>

        <div className="flex flex-col pb-3">
          <label>Diagnosis</label>
          <input
            type="text"
            placeholder="e.g. Viral Infection"
            className="outline-0 px-2 py-1 border-b-2 border-[#036176]"
            {...register("diagnosis", { required: "Diagnosis is required" })}
          />
          {errors.diagnosis && (
            <small className="text-red-500">{errors.diagnosis.message}</small>
          )}
        </div>

        <div className="flex flex-col pb-3">
          <label>Tests</label>
          <input
            type="text"
            placeholder="e.g. Blood Test, X-Ray"
            className="outline-0 px-2 py-1 border-b-2 border-[#036176]"
            {...register("tests")}
          />
        </div>

        <div className="flex flex-col pb-3">
          <label>Notes</label>
          <textarea
            rows="3"
            placeholder="Additional notes..."
            className="outline-0 px-2 py-1 border-b-2 border-[#036176]"
            {...register("notes")}
          ></textarea>
        </div>

        {!medicalRecordLoading ? (
          <button
            type="submit"
            className="bg-[#024D5C] text-white px-4 py-2 rounded hover:bg-[#013f4a] mt-2"
          >
            Submit Medical Record
          </button>
        ) : (
          <LoadingButton />
        )}
      </form>
    </div>
  );
}

export default MedicalRecordForm;
