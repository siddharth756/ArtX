import Image from "../models/Image.js";
import axios from "axios"
import User from "../models/user.js"  

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const { userId } = req.user; 

    if (!prompt) {
      return res.status(400).json({ status: "failed", message: "Prompt is required." });  
    }
    if (!userId) {
      return res.status(400).json({ status: "failed", message: "User ID is required." });
    }
    const user = await User.findById(userId);

    if (user.creditBalance <= 0) {
      return res.status(400).json({ status: "failed", message: "Insufficient credits." });
    }

    const form = new FormData();
    form.append("prompt", prompt);

    console.log("Generating...")

    const image = await axios.post('https://clipdrop-api.co/text-to-image/v1',form,{
      headers: { "x-api-key": process.env.CLIPDROP_API_KEY }, responseType: "arraybuffer"
    })

    console.log("Image generated");

    const buffer = Buffer.from(image.data);
    const imageBase64 = buffer.toString("base64");
    const dataUrl = `data:image/png;base64,${imageBase64}`;

    await user.updateOne({ $inc: { creditBalance: -1 } });
    console.log("User credits updated");

    res.status(200).json({ status: "success", dataUrl, creditBalance: user.creditBalance - 1 });
  } catch (error) {
    console.error("Image generation error:", error);
    res.status(500).json({
      status: "failed",
      message: error.message || "Something went wrong during image generation.",
    });
  }
};


export const getImages = async (req, res) => {
  try {
    const images = await Image.find()
    res.json({ status: "success", images });
  } catch (error) {
    res.status(500).json({ status: "failed", error });
  }
}

export const saveToGallary = async (req, res) => {
  try {
    const { username, imageUrl, prompt } = req.body

    const image = new Image({
      prompt,
      imageUrl,
      username
    });

    await image.save();
    console.log("Saved to DB");
    res.json({ status: "success", image });
  } catch (error) {
    res.status(500).json({ status: "failed", error });
  }
}