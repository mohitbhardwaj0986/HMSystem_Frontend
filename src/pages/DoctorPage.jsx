import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetAllDoctorProfile } from "../store/actions/doctorProfileAction";
import { useEffect } from "react";
import userDefaultIMG from "../assets/default-userImg.avif";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSponner";

function DoctorPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetAllDoctorProfile());
  }, [dispatch]);
  const { doctorProfile, loading, error } = useSelector(
    (state) => state.doctorProfile
  );
  console.log(doctorProfile);
  return (
    <div className="px-4 py-8  min-h-screen">
  <h1 className="text-center text-[#036176] text-3xl font-bold mb-8">Our Doctors</h1>

  {!loading?<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
    {doctorProfile?.map((item) => (
      <div
        key={item._id}
        className="bg-gradient-to-b from-[#bcfcff] to-[#f5ffff] rounded-lg shadow-md p-4 flex flex-col items-center"
      >
        <div className="w-24 h-24 md:w-28 md:h-28 overflow-hidden rounded-full mb-3 border border-[#036176]">
          <img
            className="w-full h-full object-cover"
            src={
              item?.user?.avatar && item.user.avatar !== ""
                ? item.user.avatar
                : userDefaultIMG
            }
            alt="Doctor Avatar"
          />
        </div>
        <div className="text-center space-y-1">
          <h2 className="font-semibold text-lg text-[#036176]">{item.user.fullName}</h2>
          <p className="text-sm text-gray-600">{item.bio}</p>
          <Link
            to={`/single-doctor/${item._id}`}
            className="inline-block mt-2 px-4 py-1 rounded bg-[#036176] text-white hover:bg-[#024d5c] transition"
          >
            Profile
          </Link>
        </div>
      </div>
    ))}
  </div>:<LoadingSpinner/>}
</div>

  );
}

export default DoctorPage;
