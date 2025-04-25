import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

function Profile() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { logout, user } = useAuth();
    const dispatch = useDispatch()

    return (
        <div className="relative">
            <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-1 rounded-xl bg-gray-100 text-sm cursor-pointer"
            >
                {user?.picture ? (
                    <img
                        src={user.picture}
                        alt="User"
                        className="w-8 h-8 rounded-full"
                    />
                ) : (
                    <i className="fa-solid fa-user"></i>
                )}
                <span>{user?.name || "User"}</span>
                <i className="fa-solid fa-chevron-down"></i>
            </button>

            {dropdownOpen && (
                <div className="absolute top-10 right-0 bg-white shadow-lg rounded-md w-44 z-50 py-2 text-sm">
                    <div className="px-4 py-2">
                        Credits: <span className={`font-semibold ${user?.creditBalance === 0 ? 'text-red-500' : 'text-green-600'}`}>
                            {user?.creditBalance ?? 0}
                        </span>

                    </div>
                    <Link to="/subscription" onClick={() => setDropdownOpen(false)}>
                        <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            Subscription
                        </button>
                    </Link>
                    <button
                        onClick={() => logout(dispatch)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                        Log Out
                    </button>
                </div>
            )}
        </div>
    );
}

export default Profile;
