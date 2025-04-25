import express from "express";
import "dotenv/config";
import { generateImage, getImages, saveToGallary } from "../controller/imageController.js";
import multer from "multer"
import connectDB from "../utils/connectDB.js"
import cors from "cors"
import { googleLogin, loginUser, registerUser, userCredits } from "../controller/userController.js";
import authUser from "../models/auth.js";

const upload = multer()
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: [process.env.ALLOWED_ORIGIN1, process.env.ALLOWED_ORIGIN2], // replace with your allowed origins
  methods: ["GET", "POST", "PUT", "DELETE"], // replace with your allowed methods
  credentials: true, // optional, for cookies/headers
}));
app.use(async (req,res,next) => {
  await connectDB()
  next()
})

app.get("/", (req,res) => {
  res.write("<h1>Welcome to ArtX</h1>")
  res.end()
})


// userController Routers
app.get('/user/credits', upload.none(), authUser, userCredits)
app.post('/user/register', upload.none(), registerUser)
app.post('/user/login', upload.none(), loginUser)
app.post('/user/google-login', upload.none(), googleLogin)


// imageController Routers
app.get("/images", getImages)
app.post("/generate", upload.none(), authUser, generateImage);
app.post("/savetogallary", upload.none(), saveToGallary)

// app.listen(5000, () => {
//   console.log("Server running on http://localhost:5000");
// });

export default app;