import React, { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyOTP from './pages/VerifyOTP';

function App() {
  const [currentView, setCurrentView] = useState('register'); // 'login', 'register', 'verify'
  const [userEmail, setUserEmail] = useState('');

  const handleRegistrationSuccess = (email) => {
    setUserEmail(email);
    setCurrentView('verify');
  };

  const handleVerificationSuccess = () => {
    setCurrentView('login');
  };

  const handleResendOTP = async () => {
    // You can call registerUser again with stored data if needed
    alert('OTP resent! (Implement resend logic)');
  };

  return (
    <div className="app">
      {currentView === 'login' && <Login />}
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

      {/* Simple navigation */}
      <div style={{ 
        position: 'fixed', 
        bottom: '20px', 
        left: '50%', 
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px'
      }}>
        <button onClick={() => setCurrentView('login')}>Login</button>
        <button onClick={() => setCurrentView('register')}>Register</button>
      </div>
    </div>
  );
}

export default App;
