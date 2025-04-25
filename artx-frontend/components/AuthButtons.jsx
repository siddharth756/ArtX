import React from 'react'

function AuthButtons({ openModel}) {
    return (
        <>
            <div
                className="px-3 py-1 rounded-xl text-sm cursor-pointer bg-gray-100"
                onClick={() => openModel("Login")}
            >
                Log In
            </div>
            <div
                className="bg-black text-white px-3 py-1 text-sm rounded-xl cursor-pointer"
                onClick={() => openModel("Signup")}
            >
                Sign Up
            </div>
        </>
    )
}

export default AuthButtons