import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function RegisterUser(){

    const navigate = useNavigate();

    const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [comPassword, setComPassword] = useState("");

    async function handleSubmit(e){

        // prevent auto refresh of web page
        e.preventDefault();

        // Check if passwords match
        if (password !== comPassword) {
            alert("Passwords do not match!");
            return;
        }

        const user = {
            "name" : name,
            "email" : email,
            "password" : password,
            "role": "user"
        }

        try{

            const response = await axios.post(`${VITE_BACKEND_API_URL}/user/create`, user);
             
            console.log(response);
            alert(response.data.message);

            // Navigate to OTP verification page with email
            navigate("/verify-user", { 
                state: { 
                    "email": email
                } 
            });

        }catch(error){

            console.error(error);
            alert(error.message);
        }

    }

    return(
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <div className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                        <p className="text-gray-600 mt-2">Sign up to get started</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Name
                            </label>
                            <input 
                                type="text"
                                placeholder="Enter Your Name"
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email
                            </label>
                            <input 
                                type="email"
                                placeholder="Enter Your Email Here"    
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <input 
                                type="password"
                                placeholder="Enter Password"  
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            />
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <input 
                                type="password"
                                placeholder="Enter Password Again"
                                onChange={(e) => setComPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            />
                        </div>

                        {/* Submit Button */}
                        <a href="/verify-user">
                        <button 
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Create Account
                        </button></a>

                        {/* Additional Links */}
                        <div className="text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <a href="/login" className="text-indigo-600 hover:text-indigo-800 font-semibold">
                                Sign in
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}