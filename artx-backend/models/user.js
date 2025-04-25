import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    userImage: { type: String, default: "" },
    isGoogleUser: { type: Boolean, default: false },
    creditBalance: { type: Number, default: 5 },
    subscription: { type: String, required: true, default: "Free" },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
});

export default mongoose.model.User || mongoose.model("User",userSchema)