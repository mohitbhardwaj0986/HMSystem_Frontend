import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ProtectedRoutes from "../components/ProtectedRoutes";
import DoctorPage from "./DoctorPage";
import SingleDoctorProfile from "./SingleDoctorProfile";
import AppointmentForm from "./AppointmentForm";
import Profile from "./Profile";

function MainRoutes() {
  return (
    <>
      <Routes>
        {/* Protected routes */}
        <Route
          path="/"
          element={
            // <ProtectedRoutes>
            <Home />
            /* </ProtectedRoutes> */
          }
        />
        <Route path="/doctor" element={<DoctorPage />} />
        <Route path="/single-doctor/:id" element={<SingleDoctorProfile />} />
        <Route path="/appointment-create/:id" element={<AppointmentForm />} />
        <Route path="/profile" element={<Profile />} />

        {/* None protected routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default MainRoutes;
