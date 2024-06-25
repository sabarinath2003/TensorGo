// src/components/Login.js
import React from 'react';

const Login = () => {
  const googleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div>
      <button onClick={googleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
