import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "../components/ProtectedRoutes";
import NonProtectedRoutes from "../components/NonProtectedRoutes";
import LoadingSpinner from "./LoadingSponner";

// Lazy-loaded components
const Home = lazy(() => import("./Home"));
const Login = lazy(() => import("../auth/Login"));
const Register = lazy(() => import("../auth/Register"));
const DoctorPage = lazy(() => import("./DoctorPage"));
const SingleDoctorProfile = lazy(() => import("./SingleDoctorProfile"));
const AppointmentForm = lazy(() => import("./AppointmentForm"));
const Profile = lazy(() => import("./Profile"));
const PrescriptionForm = lazy(() => import("./PrescriptionForm"));
const PrescriptionUpdate = lazy(() => import("./PrescriptionUpdate"));
const MedicalRecordForm = lazy(() => import("./MedicalRecordForm"));
const MedicalRecordupdateForm = lazy(() => import("./MedicalRecordupdateForm"));
const BillForm = lazy(() => import("./BillForm"));
const DoctorProfileForm = lazy(() => import("./DoctorProfileForm"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
function MainRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Protected routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/doctor" element={<DoctorPage />} />
          <Route path="/single-doctor/:id" element={<SingleDoctorProfile />} />
          <Route path="/appointment-create/:id" element={<AppointmentForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/create/prescription/:id"
            element={<PrescriptionForm />}
          />
          <Route
            path="/update/prescription/:id"
            element={<PrescriptionUpdate />}
          />
          <Route
            path="/create/medicalrecord/:id"
            element={<MedicalRecordForm />}
          />
          <Route
            path="/update/medicalrecord/:id"
            element={<MedicalRecordupdateForm />}
          />
          <Route path="/bill/create/:id" element={<BillForm />} />
          <Route path="/doctorprofiel/create" element={<DoctorProfileForm />} />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        {/* Non-protected routes */}
        <Route element={<NonProtectedRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default MainRoutes;
