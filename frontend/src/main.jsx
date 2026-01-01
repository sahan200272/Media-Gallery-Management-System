import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId="178236350462-mfn738ric6864nvk5h2b04ih190664rk.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
