import React from "react";
import HomeImg from "../assets/hospital-home-img.jpg";
import HomeDoctor from "../assets/Home-doctor-removebg-preview.png";
import { GoArrowUpRight } from "react-icons/go";
import {useNavigate} from "react-router-dom"
function Home() {
  const navigate = useNavigate()
  return (
    <div className="py-5">
      {/* Hero Section */}
      <section className="w-[95%] h-[90vh] mx-auto bg-gradient-to-b from-[#27cbd3] to-[#61eeee] rounded-xl relative overflow-hidden">
        <div className="flex justify-between text-white">
          {/* Left Content */}
          <div className="w-[55%] pt-10 pl-15">
            <h1 className="text-5xl">
              The <span className="font-bold text-[#036176]">Best Medical</span>{" "}
              and Treatment Center for You
            </h1>
            <p className="mt-5 leading-4.5">
              Your health is our top priority. We deliver compassionate care
              using advanced medical technology—ensuring safe, personalized
              treatment for every patient.
            </p>
            <button onClick={()=>navigate("/doctor")} className="bg-white text-[#036176] py-1 px-2 rounded-full mt-5 hover:text-white hover:bg-[#036176] duration-500 active:bg-[#024d5c]">
              Make Appointment
            </button>
            <div className="flex justify-between mt-10">
              <div>
                <h1 className="text-3xl font-bold">24/7</h1>
                <span>Emergency Service</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold">70+</h1>
                <span>Specialist Doctor</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold">1 Million+</h1>
                <span>Happy Patient</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <img src={HomeDoctor} className="" alt="" />
        </div>
        <section className="flex w-[95vw] m-auto  absolute bottom-[0%] left-[10%] gap-0.5">
          <div className="w-[12vw] h-[12vw] bg-gray-200 mt- rounded-xl">
            <div className="flex text-sm text-center py-2 px-2">
              <h1>Latest Visited Doctor</h1>
              <GoArrowUpRight className="text-2xl bg-white py-1 px-1 hover:rotate-360 duration-200 rounded-full" />
            </div>
            <div className="flex justify-center">
              <img
                className="w-[3vw] h-[3vw] object-top object-cover rounded-full"
                src="https://i.pinimg.com/736x/6e/9d/f2/6e9df2f3c04e28142ac302426ac5749f.jpg"
                alt=""
              />
              <img
                className="w-[3vw] h-[3vw] object-top object-cover rounded-full"
                src="https://i.pinimg.com/736x/db/cd/a1/dbcda113d27e3c87c30410023c623f19.jpg"
                alt=""
              />
              <img
                className="w-[3vw] h-[3vw] object-top object-cover rounded-full"
                src="https://i.pinimg.com/736x/6d/b4/4f/6db44f206bb332cd749c5e92ed9bfa91.jpg"
                alt=""
              />
            </div>
            <h1 className="py-2 px-2 text-center text-xs">
              More than 100+ doctor team
            </h1>
          </div>

          {/* Card 2 - Specialist Doctors */}
          <div className="w-[12vw] h-[12vw] bg-gradient-to-b from-[#bcfcff] to-[#389696] rounded-xl flex flex-col items-center justify-between p-3">
            {/* Top Button */}
            <button className="bg-white text-[#036176] py-1 px-3 rounded-full hover:text-white hover:bg-[#036176] duration-300 active:bg-[#024d5c] text-sm font-medium">
              Doctors
            </button>

            {/* Heading */}
            <div className="text-sm text-center font-semibold text-white">
              <h1>Our Specialist Doctor</h1>
            </div>

            {/* Images */}
            <div className="flex gap-2 items-center">
              <img
                className="w-[2.5vw] h-[2.5vw] object-cover rounded-full border-2 border-white"
                src="https://i.pinimg.com/736x/6e/9d/f2/6e9df2f3c04e28142ac302426ac5749f.jpg"
                alt="doctor-1"
              />
              <img
                className="w-[2.5vw] h-[2.5vw] object-cover rounded-full border-2 border-white"
                src="https://i.pinimg.com/736x/db/cd/a1/dbcda113d27e3c87c30410023c623f19.jpg"
                alt="doctor-2"
              />
              <img
                className="w-[2.5vw] h-[2.5vw] object-cover rounded-full border-2 border-white"
                src="https://i.pinimg.com/736x/6d/b4/4f/6db44f206bb332cd749c5e92ed9bfa91.jpg"
                alt="doctor-3"
              />
            </div>
          </div>

          {/* Card 3 - Connect Now */}
          <div className="w-[12vw] h-[12vw] bg-gray-200 rounded-xl">
            <div className="flex text-sm text-center py-2 px-2">
              <h1>Connect with our professional doctor</h1>
            </div>
            <button className="bg-white text-[#036176] m-auto block py-1 px-2 rounded-full mt-5 hover:text-white hover:bg-[#036176] duration-500 active:bg-[#024d5c]">
              Connect Now
            </button>
          </div>

          {/* Card 4 - Image Card */}

          <div className="w-[12vw] h-[12vw] rounded-xl overflow-hidden">
            <img
              className="w-full h-full object-top-left[90%] object-cover"
              src="https://i.pinimg.com/736x/7a/88/56/7a885696bd5862b1c3dbcdcb8ddf43d8.jpg"
              alt=""
            />
          </div>
        </section>
      </section>
    </div>
  );
}

export default Home;
