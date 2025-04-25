import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        return; // already connected
    }

    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB connected.")
    } catch (error) {
        throw error;
    }
}

export default connectDB;