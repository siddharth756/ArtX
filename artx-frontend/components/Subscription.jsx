import React from 'react';
import { useAuth } from '../context/AuthContext';

const plans = [
    {
        name: 'Free',
        price: '$0',
        credits: 5,
        gradient: 'from-gray-500 to-gray-800',
        button: 'Start Free',
    },
    {
        name: 'Basic',
        price: '$4.99',
        credits: 25,
        gradient: 'from-blue-500 to-indigo-600',
        button: 'Buy Basic',
    },
    {
        name: 'Pro',
        price: '$9.99',
        credits: 50,
        gradient: 'from-purple-600 to-pink-500',
        button: 'Buy Pro',
    },
];

function Subscription() {
    const { user } = useAuth()

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center flex-col justify-center bg-[#f7f9fb] px-4 bg-gradient-to-br from-white via-indigo-50 to-white">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-6xl font-bold text-center mb-10">
                    <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                        Your Current Plan
                    </span>
                </h1>
                <p className="text-lg text-gray-700">
                    Subscription: <span className="font-semibold">{user.subscription || 'Loading...'}</span> | Credits: <span className={`font-semibold ${user.creditBalance > 0 ? "text-green-600" : "text-red-600"}`}>{user.creditBalance}</span>
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-6xl w-full mx-auto px-4">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`rounded-2xl p-6 text-white bg-gradient-to-br ${plan.gradient} shadow-lg transform transition-transform duration-300 hover:scale-105 flex flex-col justify-between`}
                    >
                        <div>
                            <h2 className="text-2xl font-bold mb-2">{plan.name} Plan</h2>
                            <p className="text-lg mb-1">💳 {plan.price}</p>
                            <p className="text-sm mb-4">🎯 {plan.credits} image credits</p>
                        </div>
                        <button
                            // onClick={() => handleCheckout(plan.name)} // replace this if needed
                            className="mt-auto bg-white text-black font-semibold py-2 px-4 rounded-xl hover:bg-gray-100 transition-all duration-200 active:scale-95 cursor-pointer"
                        >
                            {plan.button}
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Subscription;
