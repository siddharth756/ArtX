import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { clearGeneratedImage } from "../feature/imageSlice";

const API_URL = import.meta.env.VITE_API_URL
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!sessionStorage.getItem("token"))
    const [userData, setUserData] = useState(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    

    const login = async (email, password) => {
        const formData = new FormData()
        formData.append("email", email)
        formData.append("password", password)

        try {
            const res = await axios.post(`${API_URL}/api/user/login`, formData);
            sessionStorage.setItem("token", res.data.token);
            setIsAuthenticated(true);
            await user();
            return { success: true };
        } catch (err) {
            const message = err?.response?.data?.message || "Login failed. Please try again.";
            return { success: false, message };
        }
    }


    const signup = async (name, email, password) => {
        const formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)

        try {
            const res = await axios.post(`${API_URL}/api/user/register`, formData)
            sessionStorage.setItem("token", res.data.token);
            console.log("Signup Success")
            setIsAuthenticated(true)
            await user()
            return {success: true}
        } catch (err) {
            const message = err?.response?.data?.message || "Signup failed. Please try again.";
            return { success: false, message };
        }
    }


    const logout = (dispatch) => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        setIsAuthenticated(false)
        setUserData(null);
        dispatch(clearGeneratedImage())
    }

    
    const user = async () => {
        const token = sessionStorage.getItem("token");
        if (!token) return;
        try { 
            const res = await axios.get(`${API_URL}/api/user/credits`, {
                headers: { token: token },
            });
            sessionStorage.setItem("user", JSON.stringify(res.data.user));
            setUserData(res.data.user);
            setIsAuthenticated(true);
        } catch (err) {
            console.error("Error fetching user:", err);
            logout(); // Token might be invalid, so clear everything
        }
    };


    const updateUser = (newUserData) => {
        sessionStorage.setItem("user", JSON.stringify(newUserData));
        setUserData(newUserData);
    };

    useEffect(() => {
        if (isAuthenticated && !userData) {
            user();
        }
    }, [isAuthenticated, userData]);
    
    const googleLoginAuthenticated = async () => {
        setIsAuthenticated(true)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, signup, logout, user: userData, updateUser, googleLoginAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
