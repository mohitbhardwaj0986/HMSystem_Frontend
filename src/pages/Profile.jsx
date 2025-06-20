import React, { useState } from "react";
import { FaUser, FaLock, FaImage } from "react-icons/fa";
import { MdTipsAndUpdates } from "react-icons/md";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  asyncChangeAvartar,
  asyncChangePassword,
  asyncUpdateUseDetials,
} from "../store/actions/userAction";
import LoadingButton from "../components/LoadingButton";

function Profile() {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("account");
  const { user, loading } = useSelector((state) => state.user);
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
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-r-2 border-[#024D5C] p-4">
        <h2 className="text-xl font-bold mb-6">Profile Settings</h2>
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
      <div className="flex-1 ">
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
                    user.fullName?.charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{user.fullName}</h2>
                  <p className="text-gray-600 capitalize">{user.role}</p>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
                <div>
                  <span className="font-medium text-gray-500">Email:</span>
                  <p>{user.email}</p>
                </div>

                <div>
                  <span className="font-medium text-gray-500">Created:</span>
                  <p>{new Date(user.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-500">
                    Last Updated:
                  </span>
                  <p>{new Date(user.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {selected === "update account" && (
          <div className="w-[50%] px-10 py-10">
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
                <Button
                  type="submit"
                >
                  Update Account
                </Button>
              ) : (
                <LoadingButton> Update Account</LoadingButton>
              )}
            </form>
          </div>
        )}

        {selected === "password" && (
          <div className="w-[50%] px-10 py-10">
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
                <Button
                  type="submit"
                >
                 Change
                </Button>
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
                <Button
                  type="submit"
                >
                  Update Image
                </Button>
              ) : (
                <LoadingButton> Update Image</LoadingButton>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
