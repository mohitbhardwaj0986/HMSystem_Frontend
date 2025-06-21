import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { asyncCreateBill } from "../store/actions/billAction";
import LoadingButton from "../components/LoadingButton";

const BillForm = () => {
    const { bills, billLoading } = useSelector((state) => state.bill);
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      services: [{ name: "", cost: "" }],
      isPaid: false,
      paymentMethod: "cash",
      totalAmount: "",
      notes: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });
  const onSubmit = (data) => {
    dispatch(asyncCreateBill(data, id));
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 bg-gradient-to-b  from-[#bcfcff] to-[#f5ffff] rounded-lg shadow-md w-full max-w-3xl mx-auto border-l-4 border-[#024D5C]"
    >
      <h2 className="text-2xl font-bold text-[#024D5C] mb-6 text-center">
        Create Bill
      </h2>

      {/* Services */}
      <div>
        <h3 className="text-[#036176] font-semibold mb-2">Services</h3>
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4"
          >
            <div className="flex flex-col">
              <label className="text-[#036176]">Service Name</label>
              <input
                type="text"
                placeholder="e.g., Consultation"
                {...register(`services.${index}.name`, {
                  required: "Service name is required",
                })}
                className="border-b-2 outline-0 px-2 py-1 border-[#036176]"
              />
              {errors.services?.[index]?.name && (
                <small className="text-red-500">
                  {errors.services[index].name.message}
                </small>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-[#036176]">Cost (₹)</label>
              <input
                type="number"
                placeholder="e.g., 500"
                {...register(`services.${index}.cost`, {
                  required: "Cost is required",
                  valueAsNumber: true,
                })}
                className="border-b-2 outline-0 px-2 py-1 border-[#036176]"
              />
              {errors.services?.[index]?.cost && (
                <small className="text-red-500">
                  {errors.services[index].cost.message}
                </small>
              )}
            </div>

            <div className="col-span-1 sm:col-span-2 text-right">
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ name: "", cost: "" })}
          className="text-sm text-[#024D5C] hover:underline mb-4"
        >
          + Add Another Service
        </button>
      </div>

      {/* Payment Method */}
      <div className="flex flex-col pb-3">
        <label className="text-[#036176]">Payment Method</label>
        <select
          {...register("paymentMethod")}
          className="border-2 px-2 py-1 rounded border-[#036176]"
        >
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="upi">UPI</option>
          <option value="insurance">Insurance</option>
        </select>
      </div>

      {/* Notes */}
      <div className="flex flex-col pb-4">
        <label className="text-[#036176]">Notes</label>
        <textarea
          {...register("notes", { required: "Note is required" })}
          rows={4}
          placeholder="Any additional billing notes..."
          className="border-2 border-[#036176] rounded px-2 py-2 resize-none"
        ></textarea>
        {errors.notes && (
          <small className="text-red-500">{errors.notes.message}</small>
        )}
      </div>

     { !billLoading?<button
        type="submit"
        className="bg-[#024D5C] text-white px-4 py-2 rounded hover:bg-[#013f4a] mt-4"
      >
        Submit Bill
      </button>:<LoadingButton/>}
    </form>
  );
};

export default BillForm;
