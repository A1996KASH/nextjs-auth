'use client';
import React, { use } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const VerifyEmailPage = () => {

  const [token, setToken] = useState('');
  const [verifed, setVerified] = useState(false);
  const [error, setError] = useState('');

  const verifyEmail = async () => {
    try {
      const response = await axios.post('/api/users/verifyemail', { token });
        console.log('response: ', response.data);
    setVerified(true);
    } catch (error) {
      console.error('Error in verifying email: ', error);
      setError('Error in verifying email');
    }
  }
  useEffect(() => {
    const urlToken = window.location.search.split('=')[1]
    setToken(urlToken);
  }, [])
  return (
    <div>
        <button onClick={verifyEmail}>Verify Email</button>
        {verifed && <p>Email verified successfully</p>}
        {error && <p>{error}</p>}
    </div>
  );
};

export default VerifyEmailPage;
