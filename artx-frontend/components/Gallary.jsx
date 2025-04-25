import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { fetchImages, setGallary } from '../feature/imageSlice';

function Gallary() {
    const gallary = useSelector((state) => state.images.gallary)
    const dispatch = useDispatch()
    const hasFetchedOnce = useRef(false)

    useEffect(() => {
        const sessionImages = sessionStorage.getItem("gallary")
        if (sessionImages) {
            const parsed = JSON.parse(sessionImages)
            dispatch(setGallary(parsed))
        } else if (!hasFetchedOnce.current && (!gallary || gallary === undefined || gallary.length === 0)) {
            hasFetchedOnce.current = true
            dispatch(fetchImages()).then(res => {sessionStorage.setItem("gallary", JSON.stringify(res.payload))})
        }
    }, [])

    return (
        <div className="px-4 py-6">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-10">
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                    Gallary
                </span>
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
                {gallary && gallary.length !== 0 && gallary.map((img, idx) => (
                    <div
                        key={idx}
                        className="relative w-full mb-4 rounded-lg overflow-hidden group"
                    >
                        {/* Image with darkening effect on hover */}
                        <img
                            src={img.imageUrl}
                            alt={`Generated ${idx}`}
                            className="w-full rounded-lg transition-all duration-300 group-hover:brightness-50"
                        />

                        {/* Stacked Info at Bottom on Hover */}
                        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-all text-white space-y-1">
                            <h3 className="text-lg font-bold">Information</h3>
                            <p className="text-sm"> 👤 User : <span className="font-medium">{img.username ?? "Unknown"}</span></p>
                            <p className="text-sm"> 💬  Prompt :  <span className="italic">{img.prompt}</span></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Gallary;

