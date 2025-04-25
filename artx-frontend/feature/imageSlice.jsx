import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export const fetchGeneratedImage = createAsyncThunk("images/fetchGeneratedImage", async (formData) => {
    try {
        const token = sessionStorage.getItem("token");
        const res = await axios.post(`${API_URL}/api/generate`, formData, { headers: { token: token } })
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const fetchImages = createAsyncThunk("images/fetchImages", async () => {
    try {
        const res = await axios.get(`${API_URL}/api/images`)
        return res.data.images
    } catch (error) {
        console.log(error)
    }
})

export const saveToGallary = createAsyncThunk("images/saveToGallary", async (formData) => {
    try {
        const res = await axios.post(`${API_URL}/api/savetogallary`, formData)
        return res.data.image
    } catch (error) {
        console.log(error)
    }
})

const initialState = {
    gallary: JSON.parse(sessionStorage.getItem("gallary")) || [],
    generatedImage: null,
    loading: false
}

const imageSlice = createSlice({
    name: "images",
    initialState,
    reducers: {
        clearGeneratedImage: (state) => {
            state.generatedImage = null;
        },
        setGallary: (state, action) => {
            state.gallary = action.payload  
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGeneratedImage.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchGeneratedImage.fulfilled, (state, action) => {
                state.loading = false
                state.generatedImage = action.payload
            })
            .addCase(fetchGeneratedImage.rejected, (state) => {
                state.loading = false
            })


            .addCase(fetchImages.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchImages.fulfilled, (state, action) => {
                state.loading = false
                state.gallary = action.payload
                sessionStorage.setItem("gallary", JSON.stringify(action.payload))
            })
            .addCase(fetchImages.rejected, (state) => {
                state.loading = false
            })


            .addCase(saveToGallary.fulfilled, (state, action) => {
                state.gallary.push(action.payload)
                sessionStorage.setItem("gallary", JSON.stringify(state.gallary))
            })
    }
})

export const { clearGeneratedImage, setGallary } = imageSlice.actions
export default imageSlice.reducer