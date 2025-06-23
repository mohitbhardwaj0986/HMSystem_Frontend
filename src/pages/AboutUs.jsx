import React from 'react'
import { FaHeartbeat, FaUserMd, FaHospitalAlt } from "react-icons/fa";
function AboutUs() {
  return (
     <div className="bg-[#f0fafa] py-10 px-4 md:px-10 text-gray-800">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-[#024D5C] mb-4">About Us</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Welcome to HMS — your trusted digital health platform. We bridge the gap between patients and healthcare providers with seamless appointment scheduling, digital prescriptions, and secure medical records.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-[#036176] mb-2">Our Mission</h2>
          <p className="text-sm text-gray-700">
            To make healthcare accessible, efficient, and transparent through digital innovation. We aim to empower patients and doctors by providing a reliable platform for managing health journeys.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-[#036176] mb-2">Our Vision</h2>
          <p className="text-sm text-gray-700">
            To revolutionize how healthcare is delivered in India by creating a smart, paperless, and patient-friendly system that supports personalized care anytime, anywhere.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-[#024D5C] mb-6">Why Choose Medicare?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-md flex flex-col items-center text-center">
            <FaHeartbeat className="text-3xl text-[#036176] mb-3" />
            <h3 className="text-lg font-semibold">24/7 Accessible</h3>
            <p className="text-sm text-gray-600">
              Book appointments and view records anytime from anywhere.
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md flex flex-col items-center text-center">
            <FaUserMd className="text-3xl text-[#036176] mb-3" />
            <h3 className="text-lg font-semibold">Verified Doctors</h3>
            <p className="text-sm text-gray-600">
              Consult with trusted, certified healthcare professionals.
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md flex flex-col items-center text-center">
            <FaHospitalAlt className="text-3xl text-[#036176] mb-3" />
            <h3 className="text-lg font-semibold">Digital Records</h3>
            <p className="text-sm text-gray-600">
              Store prescriptions and medical history securely online.
            </p>
          </div>
        </div>
      </div>

      {/* Optional: Our Team */}
      {/* <div className="mt-12">
        <h2 className="text-2xl font-bold text-center text-[#024D5C] mb-6">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-4 rounded shadow">
            <img src="/team1.jpg" alt="Team" className="w-20 h-20 rounded-full mx-auto mb-2" />
            <h4 className="font-semibold">Dr. Anand</h4>
            <p className="text-sm text-gray-600">Chief Medical Officer</p>
          </div>
          // add more...
        </div>
      </div> */}
    </div>
  )
}

export default AboutUs