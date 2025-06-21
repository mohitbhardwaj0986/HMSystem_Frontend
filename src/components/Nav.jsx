import React from "react";
import HMSLogo from "../assets/HMS logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { asyncLogout } from "../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingButton from "./LoadingButton";

function Nav() {
  const { user, loading, accessToken } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHangle = () => {
    if (!user) {
      return toast.error("please login first");
    } else {
      dispatch(asyncLogout());
    }
  };
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
          {(!user || !accessToken) && (
            <div className="flex gap-3">
              <Button onClick={() => navigate("/login")} className="">
                Login
              </Button>
              <Button onClick={() => navigate("/register")} className="">
                Sign up
              </Button>
            </div>
          )}
          <div>
            {user && accessToken && (
              <Button
                type="submit"
                onClick={() => navigate("/profile")}
                className={` rounded bg-[#036176]  text-white hover:bg-[#024d5c] transition`}
              >
                Profile
              </Button>
            )}
          </div>
          {user && accessToken && (
            <div>
              {loading ? (
                <LoadingButton
                  className={`${loading && "bg-[#6d99a3] hover:bg-[#6d99a3]"}`}
                >
                  Logout
                </LoadingButton>
              ) : (
                <Button
                  type="submit"
                  onClick={() => logoutHangle()}
                  className={`px-2 py-1 rounded bg-[#036176]  text-white hover:bg-[#024d5c] transition`}
                >
                  Logout
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
