import React from "react";
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL

const GoogleLoginButton = ({ onClose }) => {
  const { googleLoginAuthenticated } = useAuth();
  const handleLoginSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    try {
      const response = await axios.post(`${API_URL}/api/user/google-login`, { token })
      sessionStorage.setItem('token', response.data.token);
      googleLoginAuthenticated()
      if (onClose) {
        onClose(); // Close the modal after successful login
      }
    } catch (error) {
      console.error("Google Login Failed", error);
    }
  };

  const handleLoginError = () => {
    console.log("Google SignUp Failed");
  };

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
      />
    </div>
  );
};

export default GoogleLoginButton;
