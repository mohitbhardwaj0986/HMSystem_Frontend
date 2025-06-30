import React, { useEffect, useState } from "react";
import HMSLogo from "../assets/HMS logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { asyncLogout } from "../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MdMenu } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

function Nav() {
  const { user, loading, accessToken } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const logoutHandle = () => {
    if (!user) {
      return toast.error("please login first");
    } else {
      dispatch(asyncLogout());
    }
  };
  return (
    <div className="py-5 bg-gradient-to-b from-[#bcfcff] to-[#f5ffff] shadow">
      <div className="w-[95%] mx-auto flex justify-between items-center px-4 md:px-10 py-2">
        {/* Logo */}
        <div>
          <img src={HMSLogo} alt="Logo" className="w-28 md:w-32" />
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <RxCross1 className="w-6 h-6" />
            ) : (
              <MdMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center xl:justify-between xl:w-[50%]  gap-6 ">
          <div className="hidden md:flex items-center xl:justify-between  gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? "text-[#036176]" : "text-black"} font-medium`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/doctor"
            className={({ isActive }) =>
              `${isActive ? "text-[#036176]" : "text-black"} font-medium`
            }
          >
            Take Appointment
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${isActive ? "text-[#036176]" : "text-black"} font-medium`
            }
          >
            About Us
          </NavLink>
          </div>
          <div className="flex gap-5">
            {/* Auth Buttons */}
            {!user || !accessToken ? (
              <>
                <Button onClick={() => navigate("/login")}>Login</Button>
                <Button onClick={() => navigate("/register")}>Sign up</Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigate("/profile")}
                  className="bg-[#036176] text-white hover:bg-[#024d5c]"
                >
                  {user.role === "admin" ? "Dashboard" : "Profile"}
                </Button>
                {loading ? (
                  <Button disabled className="bg-[#6d99a3]">
                    Loading...
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      logoutHandle();
                      setMenuOpen(false);
                    }}
                    className="bg-[#036176] text-white hover:bg-[#024d5c]"
                  >
                    Logout
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu with Smooth Transition */}
      <div
        className={`overflow-hidden transition-all duration-700 ease-in-out md:hidden ${
          menuOpen ? "max-h-[500px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        } px-6`}
      >
        <div className="flex flex-col gap-4">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/doctor" onClick={() => setMenuOpen(false)}>
            Take Appointment
          </NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>
            About Us
          </NavLink>

          {!user || !accessToken ? (
            <>
              <Button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  navigate("/register");
                  setMenuOpen(false);
                }}
              >
                Sign up
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  navigate("/profile");
                  setMenuOpen(false);
                }}
                className="bg-[#036176] text-white hover:bg-[#024d5c]"
              >
                {user.role === "admin" ? "Dashboard" : "Profile"}
              </Button>
              {loading ? (
                <Button disabled className="bg-[#6d99a3]">
                  Loading...
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    logoutHandle();
                    setMenuOpen(false);
                  }}
                  className="bg-[#036176] text-white hover:bg-[#024d5c]"
                >
                  Logout
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
