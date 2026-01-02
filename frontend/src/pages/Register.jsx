import React, { useState } from 'react';
import { registerUser } from '../services/auth';

const Register = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...userData } = formData;
      const response = await registerUser(userData);
      
      setMessage({ 
        type: 'success', 
        text: response.message || 'Registration successful! Please check your email for OTP.' 
      });
      
      // Call onSuccess callback to switch to OTP verification
      if (onSuccess) {
        setTimeout(() => {
          onSuccess(formData.email);
        }, 1500);
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Registration failed. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-5">
      <div className="bg-white rounded-xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Create Account</h2>
        <p className="text-gray-600 text-center text-sm mb-8">Join us today</p>

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
          <div className="space-y-1.5">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg text-gray-900 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg text-gray-900 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg text-gray-900 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.password ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="Enter your password"
            />
            {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg text-gray-900 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword}</span>}
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold py-3.5 px-4 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none mt-6"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-purple-600 font-semibold hover:underline">Login here</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
