import { configureStore } from "@reduxjs/toolkit";
import imageSlice from "../feature/imageSlice"

const store = configureStore({
    reducer: {
        images: imageSlice
    }
})

export default store