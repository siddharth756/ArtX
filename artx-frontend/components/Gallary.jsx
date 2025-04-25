import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { fetchImages, setGallary } from '../feature/imageSlice';

function Gallary() {
    const [fadeIn, setFadeIn] = useState(false)
    const gallary = useSelector((state) => state.images.gallary)
    const loading = useSelector((state) => state.images.loading)
    const dispatch = useDispatch()
    const hasFetchedOnce = useRef(false)

    useEffect(() => {
        const sessionImages = sessionStorage.getItem("gallary")
        if (sessionImages) {
            const parsed = JSON.parse(sessionImages)
            dispatch(setGallary(parsed))
            setFadeIn(true)
        } else if (!hasFetchedOnce.current && (!gallary || gallary === undefined || gallary.length === 0)) {
            hasFetchedOnce.current = true
            dispatch(fetchImages()).then(res => { sessionStorage.setItem("gallary", JSON.stringify(res.payload)) })
            setTimeout(() => setFadeIn(true), 100)
        }
    }, [])

    return (
        <div className="px-4 py-6">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-10">
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                    Gallary
                </span>
            </h1>

            {
                loading ?
                    <div className="mt-58 flex justify-center items-center">
                        <div className="absolute flex space-x-1">
                            <div className="w-2 h-8 bg-indigo-500 animate-pulse [animation-delay:-0.3s]" />
                            <div className="w-2 h-8 bg-purple-500 animate-pulse [animation-delay:-0.15s]" />
                            <div className="w-2 h-8 bg-blue-500 animate-pulse" />
                        </div>
                    </div>
                    :
                    (
                        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto 
                            transition-opacity duration-700 ease-in-out 
                            ${fadeIn ? "opacity-100" : "opacity-0"}`}>
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
                    )
            }
        </div>
    )
}

export default Gallary;

