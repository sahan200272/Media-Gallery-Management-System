import React from 'react';
import GoogleSignInButton from '../components/GoogleSignInButton';

const Login = () => {
  const handleLoginSuccess = (response) => {
    console.log('Google OAuth Success:', response);
    // Send the token to your backend for verification and login
  };

  const handleLoginError = () => {
    console.error('Google OAuth Failed');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <GoogleSignInButton 
        onSuccess={handleLoginSuccess} 
        onError={handleLoginError} 
      />
    </div>
  );
};

export default Login;
