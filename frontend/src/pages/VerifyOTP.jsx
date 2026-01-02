import React, { useState } from 'react';
import { verifyOTP } from '../services/auth';

const VerifyOTP = ({ email, onSuccess, onResend }) => {
    
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only numbers
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (otp.length !== 6) {
      setMessage({ type: 'error', text: 'Please enter a valid 6-digit OTP' });
      return;
    }

    setLoading(true);

    try {
      const response = await verifyOTP({ email, otp });
      
      setMessage({ 
        type: 'success', 
        text: response.message || 'Verification successful!' 
      });

      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1500);
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Verification failed. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setOtp('');
    setMessage({ type: '', text: '' });
    if (onResend) {
      onResend();
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-5">
      <div className="bg-white rounded-xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Verify Your Email</h2>
        <p className="text-gray-600 text-center text-sm leading-relaxed mb-8">
          We've sent a 6-digit code to <strong className="text-purple-600">{email}</strong>
        </p>

        {message.text && (
          <div className={`p-3 rounded-lg text-sm mb-5 text-center ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-300' 
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 text-center">
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={handleChange}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg text-center text-2xl font-semibold tracking-widest text-gray-900 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="000000"
              maxLength="6"
              autoComplete="off"
            />
            <small className="block text-gray-500 text-xs text-center">Enter the 6-digit code sent to your email</small>
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold py-3.5 px-4 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none mt-6"
            disabled={loading || otp.length !== 6}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <div className="text-center mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">Didn't receive the code?</p>
          <button 
            type="button" 
            onClick={handleResend} 
            className="bg-transparent text-purple-600 border-2 border-purple-600 font-semibold py-2.5 px-6 rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
