import axios from "axios";
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOTP(){

    const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

    const navigate = useNavigate();
    const location = useLocation();

    const {email} = location.state || {};

    const [otp, setOtp] = useState("");

    async function verify(e){

        e.preventDefault();

        const data = {
            "email": email,
            "otp" : otp
        }

        try{
            const response = await axios.post(`${VITE_BACKEND_API_URL}/user/verify`, data);

            console.log(response.data.message);
            alert(response.data.message || "Verification successful!");
            
            // Navigate to login page after successful verification
            navigate("/login");
            
        }catch(error){

            console.error(error);
            const errorMessage = error.response?.data?.message || error.message;
            alert(errorMessage);
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Verify Your Email</h2>
                        <p className="text-gray-600 mt-2">
                            We've sent a verification code to
                        </p>
                        {email && (
                            <p className="text-indigo-600 font-semibold mt-1">{email}</p>
                        )}
                    </div>

                    <form onSubmit={verify} className="space-y-6">
                        {/* OTP Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">
                                Enter 6-Digit Code
                            </label>
                            <input 
                                type="text"
                                placeholder="000000"
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                maxLength="6"
                                className="w-full px-4 py-4 text-center text-2xl font-bold tracking-widest border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            />
                            <p className="text-xs text-gray-500 mt-2 text-center">
                                Please enter the code sent to your email
                            </p>
                        </div>

                        {/* Verify Button */}
                        <button 
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Verify Code 
                        </button>

                        {/* Additional Options */}
                        <div className="text-center space-y-2">
                            <p className="text-sm text-gray-600">
                                Didn't receive the code?
                            </p>
                            <button 
                                type="button"
                                className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm"
                            >
                                Resend Code
                            </button>
                        </div>
                    </form>
                </div>

                {/* Help Text */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Having trouble? <a href="#" className="text-indigo-600 hover:text-indigo-800 font-semibold">Contact Support</a>
                    </p>
                </div>
            </div>
        </div>
    )
}