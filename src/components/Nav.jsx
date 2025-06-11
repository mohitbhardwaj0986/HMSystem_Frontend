import React from "react";
import HMSLogo from "../assets/HMS logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";

function Nav() {
    const navigate = useNavigate()
  return (
    <div className="py-5">
    <div className="w-[95%] flex justify-between items-center   mx-auto rounded px-10 py-2 bg-gradient-to-b from-[#bcfcff] to-[#f5ffff]">
      <div>
        <img src={HMSLogo} className="w-30" alt="" />
      </div>
      <div className="flex gap-5">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            ` ${isActive ? "text-[#036176] " : "text-black"}`
          }
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            ` ${isActive ? "text-[#036176] " : "text-black"}`
          }
          to={"about"}
        >
          About Us
        </NavLink>
      </div>
      <div className="flex gap-5">
        <Button onClick={()=>navigate("/login")}  className="text-sm">Login</Button>
        <Button onClick={()=>navigate("/register")} className="text-sm">Sign up</Button>
      </div>
    </div>
    </div>
  );
}

export default Nav;
