import React from "react";
import HomeImg from "../assets/hospital-home-img.jpg";
import HomeDoctor from "../assets/Home-doctor-removebg-preview.png";
import { GoArrowUpRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="py-5 overflow-x-hidden">
  {/* Hero Section */}
  <section className="w-[95%] min-h-[90vh] mx-auto bg-gradient-to-b from-[#27cbd3] to-[#61eeee] rounded-xl relative overflow-hidden">
    <div className="flex flex-col xl:flex-row justify-between text-white px-4 xl:px-0">
      {/* Left Content */}
      <div className="w-full xl:w-[55%] pt-10 xl:pl-15">
        <h1 className="text-3xl md:text-4xl xl:text-5xl">
          The <span className="font-bold text-[#036176]">Best Medical</span>{" "}
          and Treatment Center for You
        </h1>
        <p className="mt-5 text-sm md:text-base leading-relaxed">
          Your health is our top priority. We deliver compassionate care
          using advanced medical technology—ensuring safe, personalized
          treatment for every patient.
        </p>
        <button
          onClick={() => navigate("/doctor")}
          className="bg-white text-[#036176] py-1 px-3 rounded-full mt-5 hover:text-white hover:bg-[#036176] duration-500 active:bg-[#024d5c]"
        >
          Make Appointment
        </button>
        <div className="flex justify-between mt-10 text-sm md:text-base">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">24/7</h1>
            <span>Emergency Service</span>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">70+</h1>
            <span>Specialist Doctor</span>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">1 Million+</h1>
            <span>Happy Patient</span>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <img
        src={HomeDoctor}
        className="w-full mt-5 xl:mt-0 xl:w-auto max-w-[450px] mx-auto xl:mx-0"
        alt="Doctor"
      />
    </div>
  </section>

  {/* Cards Section - Responsive Position */}
  <section
    className="flex flex-wrap justify-center xl:justify-start gap-4 xl:gap-2 
               w-[95%] mx-auto mt-10 
               relative xl:absolute xl:bottom-[-30%] xl:inset-x-0 xl:mx-auto"
  >
    {/* Card 1 - Latest Visited */}
    <div className="w-[85%] sm:w-[45%] xl:w-[12vw] h-[160px] xl:h-[12vw] bg-gray-200 rounded-xl p-2 flex flex-col justify-between">
      <div className="flex justify-between text-sm items-center">
        <h1>Latest Visited Doctor</h1>
        <GoArrowUpRight className="text-lg bg-white p-1 rounded-full hover:rotate-90 duration-200" />
      </div>
      <div className="flex justify-center gap-2 mt-2">
        {[1, 2, 3].map((_, i) => (
          <img
            key={i}
            className="w-10 h-10 xl:w-[3vw] xl:h-[3vw] object-cover object-top rounded-full"
            src={`https://i.pinimg.com/736x/${["6e/9d/f2", "db/cd/a1", "6d/b4/4f"][i]}/${["6e9df2f3c04e28142ac302426ac5749f", "dbcda113d27e3c87c30410023c623f19", "6db44f206bb332cd749c5e92ed9bfa91"][i]}.jpg`}
            alt={`Doctor ${i + 1} profile photo`}
          />
        ))}
      </div>
      <p className="text-xs text-center">More than 100+ doctor team</p>
    </div>

    {/* Card 2 - Specialist */}
    <div className="w-[85%] sm:w-[45%] xl:w-[12vw] h-[160px] xl:h-[12vw] bg-gradient-to-b from-[#bcfcff] to-[#389696] rounded-xl flex flex-col items-center justify-between p-3">
      <button className="bg-white text-[#036176] py-1 px-3 rounded-full hover:text-white hover:bg-[#036176] duration-300 active:bg-[#024d5c] text-sm font-medium">
        Doctors
      </button>
      <h1 className="text-sm font-semibold text-white text-center">
        Our Specialist Doctor
      </h1>
      <div className="flex gap-2 items-center">
        {[1, 2, 3].map((_, i) => (
          <img
            key={i}
            className="w-8 h-8 xl:w-[2.5vw] xl:h-[2.5vw] object-cover rounded-full border-2 border-white"
            src={`https://i.pinimg.com/736x/${["6e/9d/f2", "db/cd/a1", "6d/b4/4f"][i]}/${["6e9df2f3c04e28142ac302426ac5749f", "dbcda113d27e3c87c30410023c623f19", "6db44f206bb332cd749c5e92ed9bfa91"][i]}.jpg`}
            alt={`Doctor ${i + 1} profile photo`}
          />
        ))}
      </div>
    </div>

    {/* Card 3 - Connect Now */}
    <div className="w-[85%] sm:w-[45%] xl:w-[12vw] h-[160px] xl:h-[12vw] bg-gray-200 rounded-xl p-2 flex flex-col justify-between">
      <h1 className="text-sm text-center">Connect with our professional doctor</h1>
      <button className="bg-white text-[#036176] py-1 px-2 rounded-full hover:text-white hover:bg-[#036176] duration-300 active:bg-[#024d5c] mx-auto">
        Connect Now
      </button>
    </div>

    {/* Card 4 - Image Card */}
    <div className="w-[85%] sm:w-[45%] xl:w-[12vw] h-[160px] xl:h-[12vw] rounded-xl overflow-hidden">
      <img
        className="w-full h-full object-cover object-top"
        src="https://i.pinimg.com/736x/7a/88/56/7a885696bd5862b1c3dbcdcb8ddf43d8.jpg"
        alt="Team"
      />
    </div>
  </section>
</div>
  );
}

export default Home;
