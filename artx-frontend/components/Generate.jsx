import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { fetchGeneratedImage, saveToGallary } from "../feature/imageSlice"
import Loader from "../components/Loader"
import axios from "axios"
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

function Generate({ openModel }) {
  const { isAuthenticated, user, updateUser } = useAuth();
  const [prompt, setprompt] = useState("")
  const [savedPrompt, setsavedPrompt] = useState("")
  const [isLoading, setisLoading] = useState(false)
  const [savedMessage, setsavedMessage] = useState("")
  const [imageLoaded, setImageLoaded] = useState(false);
  const [massage, setMassage] = useState("")

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isAuthenticated) {
      openModel("Login")
      return;
    }

    try {
      if (user.creditBalance <= 0) {
        setMassage("Insufficient credits.")
        setTimeout(() => {
          setMassage("")
        }, 3000);
        return
      }
      
      if (!prompt) {
        setMassage("Please provide prompt.")
        setTimeout(() => {
          setMassage("")
        }, 3000);
        return
      }
      
      setisLoading(true)
      setsavedPrompt(prompt)
      const imageData = new FormData()
      imageData.append("prompt", prompt)
      
      const res = await dispatch(fetchGeneratedImage(imageData)).unwrap()
      const newUser = {...user, creditBalance: res.creditBalance }; 
      await updateUser(newUser)
      setisLoading(false)
      setprompt("")
    } catch (error) {
      console.log("Error : ", error.message)
    }
  }

  const generatedImage = useSelector((state) => state.images.generatedImage)


  const handleSaveToGallary = async () => {
    setisLoading(true)

    const cloud_app_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    const imageData = new FormData();
    imageData.append("file", generatedImage.dataUrl);
    imageData.append("upload_preset", "artx_preset");
    const uploadResult = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_app_name}/image/upload`,
      imageData
    );
    
    const formData = new FormData()
    formData.append("prompt", savedPrompt)
    formData.append("imageUrl", uploadResult.data.secure_url)
    formData.append("username", user.name)

    await dispatch(saveToGallary(formData)).unwrap()
    setisLoading(false)
    setsavedMessage("Saved to Gallary.")

    setTimeout(() => {
      setsavedMessage("");
    }, 3000);
  }


  const handleDownload = async () => {
    try {
      const imageDataUrl = generatedImage?.dataUrl;
      const link = document.createElement("a");
      link.href = imageDataUrl;
      link.download = "generated-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-64px)] px-4 py-20 bg-gradient-to-br from-white via-indigo-50 to-white">
      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-transparent bg-clip-text drop-shadow-md">
          AI
        </span>{' '}
        Image Generator
      </h1>
      <p className="text-center text-gray-500 max-w-lg mb-6">
      Enter prompt and watch our AI turn your imagination into visual art ✨
      </p>
  
      {/* Feedback Messages */}
      {savedMessage && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-500 mt-3 text-sm md:text-base text-center animate-pulse"
        >
          {savedMessage}
        </motion.p>
      )}
  
      {massage && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 mt-3 text-sm md:text-base text-center animate-pulse"
        >
          {massage}
        </motion.p>
      )}
  
      {/* Image Preview */}
      {isLoading ? (
        <Loader />
      ) : (
        generatedImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-6 w-full max-w-xl"
          >
            <div className="w-fit mx-auto p-2 rounded-xl overflow-hidden shadow-lg border border-gray-200">
              <img
                src={generatedImage?.dataUrl}
                alt="Generated"
                onLoad={() => setImageLoaded(true)}
                className={`w-full max-h-[400px] object-contain transition-all duration-700 ease-in-out transform ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              />
            </div>
  
            <div className="flex justify-between mt-4 gap-4">
              <button
                onClick={handleSaveToGallary}
                className="flex-1 text-white text-xs px-3 py-2 rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition"
              >
                Send to Gallery
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 text-white text-xs px-3 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 transition"
              >
                Download
              </button>
            </div>
          </motion.div>
        )
      )}
  
      {/* Input Form (Unchanged but styled wrapper) */}
      <div className="w-full max-w-xl mt-10 bg-white/60 backdrop-blur-md p-2 rounded-full shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-gray-100 rounded-full shadow-md focus-within:ring-2 focus-within:ring-indigo-600"
        >
          <input
            type="text"
            value={prompt}
            onChange={(e) => setprompt(e.target.value)}
            placeholder="Describe the image..."
            className="flex-grow h-12 pl-5 pr-2 text-gray-800 bg-transparent rounded-l-full focus:outline-none"
          />
          <button
            type="submit"
            className="h-12 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white rounded-r-full hover:opacity-90 transition flex items-center cursor-pointer"
          >
            <i className="fa-solid fa-arrow-up mr-2"></i> Generate
          </button>
        </form>
      </div>  
    </div>
  );
}   

export default Generate;
