import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from 'validator';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ status: "failed", message: "All fields are required." });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ status: "failed", message: "Invalid email format." });
        }
        if (password.length < 6) {
            return res.status(400).json({ status: "failed", message: "Password must be at least 6 characters long." });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: "failed", message: "User already exists." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword
        });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(201).json({ status: "success", message: "User registered successfully.", token: token });
    } catch (error) {
        console.log("Error in registerUser:", error.message);
        res.status(500).json({ status: "failed", message: "Internal server error." });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: "failed", message: "All fields are required." });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ status: "failed", message: "Invalid email format." });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: "failed", message: "User not found." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: "failed", message: "Invalid credentials." });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ status: "success", message: "User logged in successfully.", token: token });
    } catch (error) {

    }
}


export const userCredits = async (req, res) => {
    try {
        const userId = req.user.userId;
        if (!userId) {
            return res.status(400).json({ status: "failed", message: "User ID is required." });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found." });
        }
        res.status(200).json({ status: "success", message: "User credits retrieved successfully.", user: { name: user.name, creditBalance: user.creditBalance, picture: user.userImage, subscription: user.subscription } });
    } catch (error) {
        console.log("Error in userCredits:", error.message);
        res.status(500).json({ status: "failed", message: "Internal server error." });
    }
}


export const googleLogin = async (req, res) => {
    try {
        const { token } = req.body; // The Google token sent from the frontend
        if (!token) {
            return res.status(400).json({ status: "failed", message: "Google token is required." });
        }

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { email, name, picture } = ticket.getPayload();
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({
                name,
                email,
                password: "",
                userImage: picture,
                isGoogleUser: true,
            });
            await user.save();
        }

        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.status(200).json({
            status: "success",
            message: "User logged in with Google successfully.",
            token: jwtToken,
        });
    } catch (error) {
        console.error("Error in googleLogin:", error.message);
        res.status(500).json({ status: "failed", message: "Internal server error." });
    }
}