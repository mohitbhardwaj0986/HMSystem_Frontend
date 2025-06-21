import React, { useEffect, useRef, useState } from "react";
import { FaUser, FaLock, FaImage } from "react-icons/fa";
import { MdTipsAndUpdates, MdOutlineDataSaverOn } from "react-icons/md";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { FaBookMedical } from "react-icons/fa";
import { RiHealthBookFill } from "react-icons/ri";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import {
  asyncChangeAvartar,
  asyncChangePassword,
  asyncUpdateUseDetials,
} from "../store/actions/userAction";
import LoadingButton from "../components/LoadingButton";
import {
  asyncAppointmentDelete,
  asyncGetAppointment,
} from "../store/actions/appointmentAction";
import {
  asyncGetMyPrescription,
  asyncPrescriptionDelete,
} from "../store/actions/prescriptionAction";
import LoadingSpinner from "./LoadingSponner";
import {
  asyncDeleteMedicalReport,
  asyncgetMedicalRecord,
} from "../store/actions/medicaReocrdAction";
import { asyncdeleteBill, asyncGetBill } from "../store/actions/billAction";
import { asyncGetAllDoctorProfile } from "../store/actions/doctorProfileAction";

function Profile() {
  const billRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("account");
  const { user, loading } = useSelector((state) => state.user);
  const { appointment, appointmentLaoding } = useSelector(
    (state) => state.appointment
  );

  const { prescription, prescriptionLaoding } = useSelector(
    (state) => state.prescription
  );
  const { medicalRecord, medicalRecordLoading } = useSelector(
    (state) => state.medicalRecord
  );
  const { bills, billLoading } = useSelector((state) => state.bill);
  const { doctorProfile } = useSelector((state) => state.doctorProfile);
  const existeddoctor = doctorProfile.filter(
    (item) => item?.user._id == user?._id
  );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const SubmitHandler = (data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "")
    );

    dispatch(asyncUpdateUseDetials(filteredData));
  };
  const ChangePasswordSubmit = (data) => {
    dispatch(asyncChangePassword(data));
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("avatar", data.avatar[0]);

    dispatch(asyncChangeAvartar(formData));
    reset();
  };

  const userRole = user?.role;
  useEffect(() => {
    dispatch(asyncGetAppointment(userRole));
    dispatch(asyncgetMedicalRecord(userRole));
    dispatch(asyncGetBill(userRole));
    dispatch(asyncGetAllDoctorProfile());
  }, []);
  const appointmentDeleteHandle = (id) => {
    dispatch(asyncAppointmentDelete(id));
  };
  useEffect(() => {
    dispatch(asyncGetMyPrescription(userRole));
  }, []);
  const deletePrescription = (id) => {
    dispatch(asyncPrescriptionDelete(id, userRole));
  };
  const medicalRecordDeleteHangle = (id) => {
    dispatch(asyncDeleteMedicalReport(id, userRole));
  };

  const handleDownload = () => {
    const element = billRef.current;

    const options = {
      margin: 0.3,
      filename: `Bill.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf()
      .set(options)
      .from(element)
      .save()
      .catch((err) => console.error("PDF generation error:", err)); // catch errors
  };
  return (
    <div className="w-full h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-r-2 border-[#024D5C] p-4 h-full">
        <h2 className="text-xl font-bold mb-6">
          {userRole === "admin" ? "Dasboard Settings" : "Profile Settings"}
        </h2>
        <ul className="space-y-3">
          {[
            {
              label: "Account",
              icon: <FaUser />,
              key: "account",
            },
            {
              label: "Update Account",
              icon: <MdTipsAndUpdates />,
              key: "update account",
            },
            { label: "Change Password", icon: <FaLock />, key: "password" },
            { label: "Update Avatar", icon: <FaImage />, key: "avatar" },
            {
              label: "My Appointment",
              icon: <MdOutlineDataSaverOn />,
              key: "appointment",
            },
            {
              label: "All Prescription",
              icon: <RiHealthBookFill />,
              key: "prescription",
            },
            {
              label: "All Medical Records",
              icon: <FaBookMedical />,
              key: "medical records",
            },
            {
              label: "All Bills",
              icon: <FaRegMoneyBill1 />,
              key: "bills",
            },
          ].map((item) => (
            <li
              key={item.key}
              onClick={() => setSelected(item.key)}
              className={`flex items-center p-2 cursor-pointer rounded-lg transition ${
                selected === item.key
                  ? "bg-[#bcfcff] text-[#024D5C] font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Content */}

      <div className="flex-1 xl:overflow-y-auto h-full  ">
        {selected === "account" && (
          <div className="bg-gradient-to-b py-25 from-[#bcfcff] to-[#f5ffff] w-full">
            <div className="max-w-xl mx-auto  bg-white shadow-lg rounded-xl p-6 space-y-4">
              {/* Avatar */}
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-4xl">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    user?.fullName?.charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{user?.fullName}</h2>
                  <p
                    className={`${
                      user.role === "admin"
                        ? "text-green-600 font-semibold bg-green-200 py-1 px-2 rounded-full text-xs"
                        : "text-gray-600"
                    } capitalize`}
                  >
                    {user?.role}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
                <div>
                  <span className="font-medium text-gray-500">Email:</span>
                  <p>{user?.email}</p>
                </div>

                <div>
                  <span className="font-medium text-gray-500">Created:</span>
                  <p>{new Date(user?.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-500">
                    Last Updated:
                  </span>
                  <p>{new Date(user?.updatedAt).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex justify-between">
                {userRole === "doctor" && (
                  <button
                    onClick={() => navigate("/doctorprofiel/create")}
                    className={` ${
                      existeddoctor.length === 0
                        ? "bg-yellow-100 py-1 px-2 rounded-md text-yellow-600 hover:bg-amber-200 "
                        : "bg-green-100 py-1 px-2 rounded-md text-green-500 hover:bg-green-200"
                    } `}
                  >
                    {existeddoctor.length === 0 ? "Activate Profile" : "Active"}
                  </button>
                )}
                {userRole === "doctor" && existeddoctor.length > 0 && (
                  <Button
                    onClick={() =>
                      navigate(`/single-doctor/${existeddoctor[0]._id}`)
                    }
                  >
                    See Profile
                  </Button>
                )}
              </div>
            </div>
            <div></div>
          </div>
        )}

        {selected === "update account" && (
          <div className="xl:w-[50%] px-10 py-10">
            <h3 className="text-xl font-semibold mb-4 text-[#036176]">
              Update Account Details
            </h3>

            <form className="space-y-4" onSubmit={handleSubmit(SubmitHandler)}>
              {/* Full Name */}
              <div className="flex flex-col pb-2">
                <label className="mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="outline-0 px-3 py-2 border-b-2 border-[#036176] bg-white"
                  {...register("fullName", {})}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col pb-2">
                <label className="mb-1">Email</label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="outline-0 px-3 py-2 border-b-2 border-[#036176] bg-white"
                  {...register("email")}
                />
              </div>

              {/* Submit Button */}
              {!loading ? (
                <Button type="submit">Update Account</Button>
              ) : (
                <LoadingButton> Update Account</LoadingButton>
              )}
            </form>
          </div>
        )}

        {selected === "password" && (
          <div className="xl:w-[50%] px-10 py-10">
            <h3 className="text-xl font-semibold mb-4 text-[#036176]">
              Change Password
            </h3>
            <form
              onSubmit={handleSubmit(ChangePasswordSubmit)}
              className="space-y-4"
            >
              <div className="flex flex-col pb-2">
                <label className="mb-1">Old Password</label>
                <input
                  type="password"
                  placeholder="Enter your full name"
                  className="outline-0 px-3 py-2 border-b-2 border-[#036176] bg-white"
                  {...register("oldPassword", {
                    required: "oldPassword name is required",
                  })}
                />
                {errors.oldPassword && (
                  <small className="text-red-500">
                    {errors.oldPassword.message}
                  </small>
                )}
              </div>
              <div className="flex flex-col pb-2">
                <label className="mb-1">New Password</label>
                <input
                  type="password"
                  placeholder="Enter your New password"
                  className="outline-0 px-3 py-2 border-b-2 border-[#036176] bg-white"
                  {...register("newPassword", {
                    required: "New password is required",
                  })}
                />
                {errors.newPassword && (
                  <small className="text-red-500">
                    {errors.newPassword.message}
                  </small>
                )}
              </div>

              {!loading ? (
                <Button type="submit">Change</Button>
              ) : (
                <LoadingButton>Change</LoadingButton>
              )}
            </form>
          </div>
        )}

        {selected === "avatar" && (
          <div className="xl:w-[50%] px-10 py-10">
            <h3 className="text-xl font-semibold mb-4 text-[#036176]">
              Update Avatar
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  {...register("avatar", { required: "Avatar is required" })}
                  className="border border-gray-300 rounded-lg p-2 bg-white text-gray-700 file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0 file:text-sm file:font-semibold
              file:bg-[#bcfcff] file:text-[#024D5C] transition"
                />
                {errors.avatar && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.avatar.message}
                  </p>
                )}
              </div>

              {!loading ? (
                <Button type="submit">Update Image</Button>
              ) : (
                <LoadingButton> Update Image</LoadingButton>
              )}
            </form>
          </div>
        )}
        {selected === "appointment" &&
          (!appointmentLaoding ? (
            <div className="bg-gradient-to-b py-5 px-5 from-[#bcfcff] to-[#f5ffff] w-full">
              <h1 className="text-2xl font-bold mb-6 text-center text-[#024D5C]">
                My Appointments
              </h1>

              {appointment?.length === 0 ? (
                <p className="text-center text-gray-600">
                  No appointments found.
                </p>
              ) : (
                appointment?.map((appointment) => (
                  <div
                    key={appointment._id}
                    className="bg-white shadow-lg rounded-2xl p-6 mb-5 border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h2 className="text-lg font-semibold text-gray-800">
                        Patient: {appointment.patient?.fullName}
                      </h2>
                      <span
                        className={`text-sm px-3 py-1 rounded-full font-medium ${
                          appointment.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                      <p>
                        <strong>Doctor:</strong>{" "}
                        {appointment.doctor?.specialization}
                      </p>
                      <p>
                        <strong>Fee:</strong> ₹
                        {appointment.doctor?.consultationFee}
                      </p>
                      <p>
                        <strong>Reason:</strong> {appointment.reason}
                      </p>
                      <p>
                        <strong>Time Slot:</strong> {appointment.timeSlot}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(appointment.appointmentDate).toLocaleString()}
                      </p>
                      <p>
                        <strong>Created:</strong>{" "}
                        {new Date(appointment.createdAt).toLocaleString()}
                      </p>
                      <p>
                        <strong>Updated:</strong>{" "}
                        {new Date(appointment.updatedAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap xl:flex-row  gap-3 xl:gap-4 items-start xl:items-center xl:justify-between">
                      <span
                        className={`inline-block text-sm px-2 py-1 rounded-full font-semibold ${
                          appointment.isPaid
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {appointment.isPaid ? "Paid" : "Not Paid"}
                      </span>

                      {appointment.status === "completed" && (
                        <Button
                          onClick={() => setSelected("prescription")}
                          className="text-sm px-3 py-1 rounded-full"
                        >
                          See prescription
                        </Button>
                      )}

                      {userRole === "admin" &&
                        appointment.status === "completed" && (
                          <Button
                            onClick={() =>
                              navigate(`/bill/create/${appointment._id}`)
                            }
                            className="text-sm px-3 py-1 rounded-full text-white "
                          >
                            Create Bill
                          </Button>
                        )}

                      {(userRole === "doctor" || userRole === "admin") &&
                        appointment.status === "completed" && (
                          <Button
                            onClick={() =>
                              navigate(
                                `/create/medicalrecord/${appointment._id}`
                              )
                            }
                            className="text-sm px-3 py-1 rounded-full"
                          >
                            Make Record
                          </Button>
                        )}

                      {userRole === "admin" && (
                        <Button
                          onClick={() =>
                            appointmentDeleteHandle(appointment?._id)
                          }
                          className="text-sm px-3 py-1 rounded-full bg-red-500 text-white hover:bg-red-400"
                        >
                          Delete
                        </Button>
                      )}

                      {userRole === "doctor" &&
                        appointment.status === "pending" && (
                          <Button
                            onClick={() =>
                              navigate(
                                `/create/prescription/${appointment._id}`
                              )
                            }
                            className="text-sm px-3 py-1 rounded-full"
                          >
                            Create Prescription
                          </Button>
                        )}
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <LoadingSpinner />
          ))}
        {selected === "prescription" && (
          <div>
            {!prescriptionLaoding ? (
              <div className="bg-[#f2fbfd] py-10 px-4 min-h-screen bg-gradient-to-b  from-[#bcfcff] to-[#f5ffff]">
                <h1 className="text-2xl font-bold text-center text-[#024D5C] mb-6">
                  Patient Prescriptions
                </h1>
                {prescription.length === 0 && (
                  <p className="text-center text-gray-600">
                    No prescription found.
                  </p>
                )}
                {prescription?.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white shadow-md rounded-xl p-6 w-full max-w-3xl mx-auto my-6 border border-gray-200"
                  >
                    {/* Header */}
                    <div className="flex justify-between mb-2">
                      <h2 className="text-xl font-bold text-[#024D5C]">
                        Prescription
                      </h2>
                      <p className="text-sm text-gray-500">
                        Created: {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Doctor, Patient, Visit */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p>
                          <span className="font-semibold">Doctor:</span>{" "}
                          {item.doctor?.fullName || "N/A"}
                        </p>
                        <p>
                          <span className="font-semibold">Patient:</span>{" "}
                          {item.patient?.fullName || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p>
                          <span className="font-semibold">Next Visit:</span>{" "}
                          {item.nextVisitDate
                            ? new Date(item.nextVisitDate).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* Appointment Section */}
                    {item.appointment && (
                      <div className="bg-[#f9f9f9] p-4 mb-4 rounded text-sm border border-gray-200">
                        <h3 className="font-semibold text-[#036176] mb-2">
                          Appointment Details
                        </h3>
                        <p>
                          <span className="font-semibold">Date:</span>{" "}
                          {new Date(
                            item.appointment.appointmentDate
                          ).toLocaleDateString()}
                        </p>
                        <p>
                          <span className="font-semibold">Time Slot:</span>{" "}
                          {item.appointment.timeSlot}
                        </p>
                        <p>
                          <span className="font-semibold">Reason:</span>{" "}
                          {item.appointment.reason}
                        </p>
                        <p>
                          <span className="font-semibold">Status:</span>{" "}
                          {item.appointment.status}
                        </p>
                        <p>
                          <span className="font-semibold">Payment:</span>{" "}
                          {item.appointment.isPaid ? "Paid" : "Not Paid"}
                        </p>
                      </div>
                    )}

                    {/* Diagnosis & Advice */}
                    <div className="mb-4 text-sm">
                      <p>
                        <span className="font-semibold">Diagnosis:</span>{" "}
                        {item.diagnosis}
                      </p>
                      <p>
                        <span className="font-semibold">Advice:</span>{" "}
                        {item.advice}
                      </p>
                    </div>

                    {/* Medicines Table */}
                    <div>
                      <p className="font-semibold mb-2">Medicines:</p>
                      <div className="overflow-x-auto">
                        <table className="min-w-full border text-sm">
                          <thead className="bg-[#024D5C] text-white">
                            <tr>
                              <th className="py-2 px-3 border">#</th>
                              <th className="py-2 px-3 border">Name</th>
                              <th className="py-2 px-3 border">Dosage</th>
                              <th className="py-2 px-3 border">Duration</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.medicines?.map((med, index) => (
                              <tr
                                key={med._id || index}
                                className="text-center"
                              >
                                <td className="py-2 px-3 border">
                                  {index + 1}
                                </td>
                                <td className="py-2 px-3 border">{med.name}</td>
                                <td className="py-2 px-3 border">
                                  {med.dosage}
                                </td>
                                <td className="py-2 px-3 border">
                                  {med.duration}
                                </td>
                              </tr>
                            ))}
                            {item.medicines?.length === 0 && (
                              <tr>
                                <td
                                  colSpan="4"
                                  className="py-2 px-3 border text-gray-500"
                                >
                                  No medicines listed.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div className="py-5 flex justify-between">
                        <Button
                          onClick={() =>
                            navigate(`/update/prescription/${item._id}`)
                          }
                        >
                          Update Prescription
                        </Button>
                        {userRole === "admin" && (
                          <Button
                            onClick={() => deletePrescription(item._id)}
                            className="hover:bg-red-400 font-semibold bg-red-500 text-white"
                          >
                            Delete Prescription
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <LoadingSpinner />
            )}
          </div>
        )}
        {selected === "medical records" &&
          (!medicalRecordLoading ? (
            <div className="w-full bg-gradient-to-b  from-[#bcfcff] to-[#f5ffff]  px-4 sm:px-8 py-6 bg-[#f8fafc] min-h-screen">
              <h2 className="text-3xl font-bold text-[#024D5C] mb-8 text-center">
                Medical Records
              </h2>

              {medicalRecord.map((record) => (
                <div
                  key={record._id}
                  className="w-full bg-white border-l-4 border-[#024D5C] rounded-xl shadow-sm hover:shadow-md transition-all duration-300 mb-8 p-6"
                >
                  {/* Top Info Bar */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#036176]">
                        {record.patient?.fullName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {record.patient?.email}
                      </p>
                    </div>
                    <p className="text-sm text-gray-400">
                      {new Date(record.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Doctor Info */}
                  {record.appointment?.doctor?.user && (
                    <div className="mb-4">
                      <h4 className="text-[#036176] font-semibold mb-1">
                        Doctor Info
                      </h4>
                      <div className="text-sm text-gray-800">
                        <p>
                          <strong>Name:</strong>{" "}
                          {record.appointment.doctor.user.fullName}
                        </p>
                        <p>
                          <strong>Email:</strong>{" "}
                          {record.appointment.doctor.user.email}
                        </p>
                        <p>
                          <strong>Specialization:</strong>{" "}
                          {record.appointment.doctor.specialization}
                        </p>
                        <p>
                          <strong>Experience:</strong>{" "}
                          {record.appointment.doctor.experience} years
                        </p>
                        <p>
                          <strong>Education:</strong>{" "}
                          {record.appointment.doctor.education}
                        </p>
                        <p>
                          <strong>Fee:</strong> ₹
                          {record.appointment.doctor.consultationFee}
                        </p>
                        <p>
                          <strong>Timings:</strong>{" "}
                          {record.appointment.doctor.timings?.start} -{" "}
                          {record.appointment.doctor.timings?.end}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Appointment Info */}
                  <div className="mb-4">
                    <h4 className="text-[#036176] font-semibold mb-1">
                      Appointment
                    </h4>
                    <div className="text-sm text-gray-800">
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(
                          record.appointment?.appointmentDate
                        ).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Time:</strong> {record.appointment?.timeSlot}
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        <span
                          className={`px-2 py-1 rounded-full text-white text-xs ${
                            record.appointment?.status === "completed"
                              ? "bg-green-600"
                              : "bg-yellow-500"
                          }`}
                        >
                          {record.appointment?.status}
                        </span>
                      </p>
                      <p>
                        <strong>Reason:</strong> {record.appointment?.reason}
                      </p>
                      <p>
                        <strong>Paid:</strong>{" "}
                        {record.appointment?.isPaid ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>

                  {/* Medical Record */}
                  <div className="mb-4">
                    <h4 className="text-[#036176] font-semibold mb-1">
                      Medical Details
                    </h4>
                    <div className="text-sm text-gray-800">
                      <p>
                        <strong>Symptoms:</strong> {record.symptoms}
                      </p>
                      <p>
                        <strong>Diagnosis:</strong> {record.diagnosis}
                      </p>
                      {record.tests?.length > 0 && (
                        <p>
                          <strong>Tests:</strong> {record.tests.join(", ")}
                        </p>
                      )}
                      {record.notes && (
                        <p>
                          <strong>Notes:</strong> {record.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    {(userRole === "admin" || userRole === "doctor") && (
                      <Button
                        onClick={() =>
                          navigate(`/update/medicalrecord/${record._id}`)
                        }
                      >
                        updata
                      </Button>
                    )}
                    {userRole === "admin" && (
                      <Button
                        onClick={() => medicalRecordDeleteHangle(record._id)}
                        className="bg-red-500 hover:bg-red-400"
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <LoadingSpinner />
          ))}
        {selected === "bills" &&
          (!billLoading ? (
            <div className="bg-white">
              <div className="p-5 text-black text-sm font-sans mx-auto">
                <h1 className="text-3xl font-bold text-center mb-10">
                  All Patient Bills
                </h1>

                {bills?.map((bill, i) => (
                  <div
                    ref={billRef}
                    key={bill._id}
                    className="mb-12 py-5 px-10 bg-white pt-6 break-after-page border border-black"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start pb-4 mb-4 border-b border-black">
                      <div>
                        <h2 className="text-2xl font-bold">
                          Medicare Hospital
                        </h2>
                        <p className="text-sm">
                          123 Health Street, Ghaziabad, UP
                        </p>
                        <p className="text-sm">Phone: +91-9876543210</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-semibold">Bill #{i + 1}</p>
                        <p className="text-sm">
                          Date: {new Date(bill.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-sm">
                          Bill ID: #{bill._id.slice(-6)}
                        </p>
                      </div>
                    </div>

                    {/* Patient and Doctor Info */}
                    <div className="grid grid-cols-2 gap-6 text-sm mb-6">
                      <div>
                        <h3 className="font-semibold mb-1">Patient Info</h3>
                        <p>
                          <strong>Name:</strong> {bill.patient?.fullName}
                        </p>
                        <p>
                          <strong>Email:</strong> {bill.patient?.email}
                        </p>
                        <p>
                          <strong>Appointment Date:</strong>{" "}
                          {new Date(
                            bill.appointment?.appointmentDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Doctor Info</h3>
                        <p>
                          <strong>Name:</strong>{" "}
                          {bill.appointment?.doctor?.user?.fullName}
                        </p>
                        <p>
                          <strong>Specialization:</strong>{" "}
                          {bill.appointment?.doctor?.specialization}
                        </p>
                        <p>
                          <strong>Fee:</strong> ₹
                          {bill.appointment?.doctor?.consultationFee}
                        </p>
                      </div>
                    </div>

                    {/* Services Table */}
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">Services</h3>
                      <table className="w-full border border-black text-sm">
                        <thead>
                          <tr>
                            <th className="p-2 border border-black">#</th>
                            <th className="p-2 border border-black text-left">
                              Service
                            </th>
                            <th className="p-2 border border-black text-right">
                              Cost (₹)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {bill.services.map((srv, idx) => (
                            <tr key={idx}>
                              <td className="p-2 border border-black text-center">
                                {idx + 1}
                              </td>
                              <td className="p-2 border border-black">
                                {srv.name}
                              </td>
                              <td className="p-2 border border-black text-right">
                                {srv.cost}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Payment Summary */}
                    <div className="flex justify-end text-sm mb-4">
                      <div className="w-full sm:w-1/2">
                        <div className="flex justify-between py-1 border-t border-black">
                          <span className="font-semibold">Total Amount:</span>
                          <span>₹{bill.totalAmount}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="font-semibold">Payment Method:</span>
                          <span>{bill.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="font-semibold">Status:</span>
                          <span>{bill.isPaid ? "Paid" : "Unpaid"}</span>
                        </div>
                        {bill.paidAt && (
                          <div className="flex justify-between py-1">
                            <span className="font-semibold">Paid At:</span>
                            <span>
                              {new Date(bill.paidAt).toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Notes */}
                    {bill.notes && (
                      <div className="text-sm">
                        <h4 className="font-semibold mb-1">Notes:</h4>
                        <p>{bill.notes}</p>
                      </div>
                    )}
                  </div>
                ))}

                <div className="text-center text-xs mt-10">
                  {bills?.length > 0 && (
                    <Button onClick={handleDownload} className="mt-2 no-print">
                      Download
                    </Button>
                  )}
                  <p>
                    This is a computer-generated bill. No signature required.
                  </p>
                  <p>Powered by Medicare Hospital Billing System</p>
                </div>
              </div>
            </div>
          ) : (
            <LoadingSpinner />
          ))}
      </div>
    </div>
  );
}

export default Profile;
