import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { asyncPrescriptionUpdate } from "../store/actions/prescriptionAction";
import LoadingButton from "../components/LoadingButton";

function PrescriptionUpdate() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { prescription, prescriptionLaoding } = useSelector(
    (state) => state.prescription
  );
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      medicines: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "medicines",
  });
  const prescriptionUpdateHandler = (data) => {
    dispatch(asyncPrescriptionUpdate(data, id));
  };
  return (
    <div className="py-5  min-h-screen">
      <form
        onSubmit={handleSubmit(prescriptionUpdateHandler)}
        className="w-full max-w-2xl mx-auto bg-gradient-to-b from-[#bcfcff] to-[#f5ffff] bg-white shadow-md rounded-xl p-6"
      >
        <h2 className="text-xl font-semibold text-center pb-4">
          Prescription Form
        </h2>

        {/* Diagnosis */}
        <div className="flex flex-col pb-3">
          <label>Diagnosis</label>
          <input
            type="text"
            placeholder="e.g. Viral Fever"
            className="outline-0 px-2 py-1 border-b-2 border-[#036176]"
            {...register("diagnosis")}
          />
        </div>

        {/* Medicines */}
        <div className="pb-4">
          <label className="block text-lg font-medium pb-2">Medicines</label>

          {fields.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 border-b pb-3"
            >
              {/* Name */}
              <div className="flex flex-col">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Paracetamol"
                  className="outline-0 px-2 py-1 border-b-2 border-[#036176]"
                  {...register(`medicines.${index}.name`)}
                />
              </div>

              {/* Dosage */}
              <div className="flex flex-col">
                <label>Dosage</label>
                <input
                  type="text"
                  placeholder="1 tablet twice a day"
                  className="outline-0 px-2 py-1 border-b-2 border-[#036176]"
                  {...register(`medicines.${index}.dosage`)}
                />
              </div>

              {/* Duration */}
              <div className="flex flex-col">
                <label>Duration</label>
                <input
                  type="text"
                  placeholder="5 days"
                  className="outline-0 px-2 py-1 border-b-2 border-[#036176]"
                  {...register(`medicines.${index}.duration`)}
                />
              </div>

              {/* Remove button */}
              <div className="col-span-1 md:col-span-3 text-right">
                <button
                  type="button"
                  className="text-red-500 text-sm mt-2"
                  onClick={() => remove(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="mt-2 px-3 py-1 bg-[#036176] text-white rounded"
            onClick={() => append({ name: "", dosage: "", duration: "" })}
          >
            + Add Medicine
          </button>
        </div>

        {/* Advice */}
        <div className="flex flex-col pb-3">
          <label>Advice</label>
          <textarea
            placeholder="Drink plenty of fluids, rest well..."
            className="outline-0 px-2 py-1 border-b-2 border-[#036176]"
            {...register("advice")}
          />
        </div>

        {/* Next Visit Date */}
        <div className="flex flex-col pb-4">
          <label>Next Visit Date</label>
          <input
            type="date"
            className="outline-0 px-2 py-1 border-b-2 border-[#036176]"
            {...register("nextVisitDate")}
            min={new Date().toISOString().split("T")[0]} // prevent past dates
          />
        </div>

        {!prescriptionLaoding ? (
          <button
            type="submit"
            className="bg-[#024D5C] text-white py-2 rounded hover:bg-[#013f4a] w-full"
          >
            Update Prescription
          </button>
        ) : (
          <LoadingButton />
        )}
      </form>
    </div>
  );
}

export default PrescriptionUpdate;
