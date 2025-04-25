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
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use(cors({
  origin: [process.env.ALLOWED_ORIGIN1, process.env.ALLOWED_ORIGIN2], // replace with your allowed origins
  methods: ["GET", "POST", "PUT", "DELETE"], // replace with your allowed methods
  credentials: true, // optional, for cookies/headers
}));

router.use(async (req,res,next) => {
  await connectDB()
  next()
})

app.get("/", (req,res) => {
  res.json({ message: "Welcome to the ArtX API" })
})


// userController Routers
router.get('/user/credits', upload.none(), authUser, userCredits)
router.post('/user/register', upload.none(), registerUser)
router.post('/user/login', upload.none(), loginUser)
router.post('/user/google-login', upload.none(), googleLogin)


// imageController Routers
router.get("/images", getImages)
router.post("/generate", upload.none(), authUser, generateImage);
router.post("/savetogallary", upload.none(), saveToGallary)

// app.listen(5000, () => {
//   console.log("Server running on http://localhost:5000");
// });
app.use("/api", router)

export default app;