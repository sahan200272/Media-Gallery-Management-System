import React, { useState } from 'react';
import Home from './pages/Home';
import Register from './pages/Register';
import VerifyOTP from './pages/VerifyOTP';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'register', 'verify'
  const [userEmail, setUserEmail] = useState('');

  const handleRegistrationSuccess = (email) => {
    setUserEmail(email);
    setCurrentView('verify');
  };

  const handleVerificationSuccess = () => {
    setCurrentView('home');
  };

  const handleResendOTP = async () => {
    // You can call registerUser again with stored data if needed
    alert('OTP resent! (Implement resend logic)');
  };

  return (
    <div className="app">
      {currentView === 'home' && <Home onRegisterClick={() => setCurrentView('register')} />}
      {currentView === 'register' && (
        <Register onSuccess={handleRegistrationSuccess} />
      )}
      {currentView === 'verify' && (
        <VerifyOTP 
          email={userEmail}
          onSuccess={handleVerificationSuccess}
          onResend={handleResendOTP}
        />
      )}
    </div>
  );
}

export default App;
