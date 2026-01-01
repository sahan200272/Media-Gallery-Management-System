import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleSignInButton = ({ onSuccess, onError }) => {
  return (
    <GoogleLogin
      onSuccess={credentialResponse => onSuccess(credentialResponse)}
      onError={() => onError()}
    />
  );
};

export default GoogleSignInButton;
