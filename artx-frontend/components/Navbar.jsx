import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AuthButtons from "./AuthButtons"
import Profile from "./Profile";
import logo from "../src/assets/logo.png"

const Navbar = ({ openModel }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isAuthenticated } = useAuth() 

  return (
    <>
      <nav className="bg-white w-full text-black px-4 py-3 flex items-center flex-col justify-between">
        {/* Left: Logo + Name */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 text-xl font-bold w-68">
            <NavLink to={"/"}>
              <img src={logo} alt="Logo" className="h-6 w-6 md:h-8 md:w-8" />
            </NavLink>
            <span>ArtX</span>
          </div>

          {/* Center: Nav Items */}
          <div className="hidden md:flex justify-around w-68 p-2 rounded-2xl bg-gray-100 relative">

            <NavLink to={"/"} className={({ isActive }) =>
              `px-4 rounded relative group hover:bg-white ${isActive ? "bg-white" : ""}`
            }>
              <i className="fa-solid fa-house"></i>
              <div className="absolute top-11 left-1 bg-gray-100 rounded px-2 text-[12px] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-in-out">
                Home
              </div>
            </NavLink>

            <NavLink to={"/generate"} className={({ isActive }) =>
              `px-4 rounded relative group hover:bg-white ${isActive ? "bg-white" : ""}`
            }>
              <i className="fa-solid fa-image"></i>
              <div className="absolute top-11 left-1 bg-gray-100 rounded px-2 text-[12px] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-in-out">
                Image
              </div>
            </NavLink>

            <NavLink to={"/gallary"} className={({ isActive }) =>
              `px-4 rounded relative group hover:bg-white ${isActive ? "bg-white" : ""}`
            }>
              <i className="fa-solid fa-images"></i>
              <div className="absolute top-11 left-1 bg-gray-100 rounded px-2 text-[12px] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-in-out">
                Gallery
              </div>
            </NavLink>
          </div>


          {/* Right: Auth Buttons */}
          <div className="hidden md:flex gap-4 w-68 justify-end">
            {isAuthenticated ? <Profile /> : <AuthButtons openModel={openModel} />}
          </div>


          {/* Mobile: Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="transition-transform duration-300 ease-in-out transform hover:scale-110"
            >
              {menuOpen ? (
                <i className="fa fa-close transition-all duration-300 ease-in-out rotate-180"></i>
              ) : (
                <i className="fa fa-bars transition-all duration-300 ease-in-out"></i>
              )}
            </button>
          </div>
        </div>


        {/* Mobile Slide-in Menu */}
        {menuOpen && (
          isAuthenticated ? (
            <div className="w-full bg-white flex flex-col items-center gap-4 py-3 z-50 md:hidden transition-all duration-300 ease-in-out">
              <Profile />
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `px-4 rounded relative group hover:bg-white ${isActive ? "bg-white" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to={"/generate"}
                className={({ isActive }) =>
                  `px-4 rounded relative group hover:bg-white ${isActive ? "bg-white" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                Generate Image
              </NavLink>
              <NavLink
                to={"/gallary"}
                className={({ isActive }) =>
                  `px-4 rounded relative group hover:bg-white ${isActive ? "bg-white" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                Gallery
              </NavLink>
            </div>
          ) : (
            <div className="w-full bg-white flex flex-col items-center gap-4 py-3 z-50 md:hidden transition-all duration-300 ease-in-out">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `px-4 rounded relative group hover:bg-white ${isActive ? "bg-white" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to={"/gallary"}
                className={({ isActive }) =>
                  `px-4 rounded relative group hover:bg-white ${isActive ? "bg-white" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                Gallery
              </NavLink>
              <button
                className="bg-black text-white w-4/5 py-1 rounded-xl"
                onClick={() => {
                  setMenuOpen(false)
                  openModel("Signup")
                }}
              >
                Sign Up
              </button>
              <button
                className="border border-black text-black w-4/5 py-1 rounded-xl"
                onClick={() => {
                  setMenuOpen(false)
                  openModel("Login")
                }}
              >
                Log In
              </button>
            </div>
          )
        )}

      </nav >
    </>
  );
};

export default Navbar;
