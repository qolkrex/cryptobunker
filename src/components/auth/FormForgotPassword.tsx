"use client"
import React from 'react'

export const FormForgotPassword = () => {
    return (
        <div className="max-w-md w-full px-6 py-8 bg-primary shadow-md rounded-md text-white">
            <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
            <form className="space-y-4">
                <div>
                    <label htmlFor="email" className="block font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500
                sm:text-sm
                py-3
                px-4
                text-gray-700
                "
                        placeholder="Enter your email"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Reset Password
                </button>
            </form>
        </div>
    )
}
