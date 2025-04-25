import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import GoogleLoginButton from "../context//GoogleLoginButton";

const Signup = ({ onClose, openModel }) => {
  const { signup } = useAuth();
    const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    
    const res = await signup(name, email, password); 
    if (res.success) {
      onClose();
    } else {
      setError(res.message);

      setTimeout(() => {
        setError("");
      }
        , 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-sm mt-2 text-center mb-2 animate-pulse">{error}</p>}
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input type="text" placeholder="Name" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 required" />
          <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 required" />
          <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white py-2 rounded-md hover:opacity-90 transition cursor-pointer"
          >
            Sign Up
          </button>
          <p className="text-center text-sm">
            have an account? <span className="text-indigo-500 cursor-pointer" onClick={() => openModel("Login")}>Log In</span>
          </p>
          <GoogleLoginButton onclose={onClose}/>
          <button type="button" onClick={onClose} className="text-sm text-gray-500 underline mx-auto cursor-pointer">
            Cancel
          </button>
        </form>

      </div>
    </div>
  );
};

export default Signup;
