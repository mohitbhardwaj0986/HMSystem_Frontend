import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { asyncSingledoctorProfile } from "../store/actions/doctorProfileAction";
import userDefaultIMG from "../assets/default-userImg.avif";
import LoadingSpinner from "./LoadingSponner";
import Button from "../components/Button";

function SingleDoctorProfile() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { singleDoctorProfile, loading, error } = useSelector(
    (state) => state.doctorProfile
  );
  console.log(singleDoctorProfile);

  const { id } = useParams();
  useEffect(() => {
    dispatch(asyncSingledoctorProfile(id));
  }, []);
  return (
   <div className="min-h-screen py-10 bg-gradient-to-b from-[#bcfcff] to-[#f5ffff]">
  {!loading ? (
    <div className="max-w-3xl mx-auto mt-6 px-4 sm:px-6 lg:px-8 p-6 rounded-xl shadow-md border border-gray-200 bg-white">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={
            singleDoctorProfile?.user?.avatar
              ? singleDoctorProfile?.user.avatar
              : userDefaultIMG
          }
          alt="Doctor Avatar"
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border border-gray-300"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-[#036176]">
            {singleDoctorProfile?.specialization}
          </h2>
          <p className="text-sm text-gray-500">
            {singleDoctorProfile?.education}
          </p>
          <p className="mt-2 text-gray-700">
            <strong>Specialization:</strong>{" "}
            {singleDoctorProfile?.specialization}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4 text-sm sm:text-base">
        <p>
          <strong className="text-[#036176]">Education:</strong>{" "}
          {singleDoctorProfile?.education}
        </p>
        <p>
          <strong className="text-[#036176]">Experience:</strong>{" "}
          {singleDoctorProfile?.experience} years
        </p>
        <p>
          <strong className="text-[#036176]">Consultation Fee:</strong> ₹
          {singleDoctorProfile?.consultationFee}
        </p>
        <p>
          <strong className="text-[#036176]">Available Timings:</strong>{" "}
          {singleDoctorProfile?.timings?.start} -{" "}
          {singleDoctorProfile?.timings?.end}
        </p>
        <p>
          <strong className="text-[#036176]">Bio:</strong>{" "}
          {singleDoctorProfile?.bio}
        </p>
        <Button onClick={()=>navigate(`/appointment-create/${singleDoctorProfile._id}`)}>Appointment</Button>
      </div>
    </div>
  ) : (
    <LoadingSpinner />
  )}
</div>


  );
}

export default SingleDoctorProfile;
