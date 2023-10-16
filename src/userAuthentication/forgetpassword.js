import React, { useState } from "react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = () => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCGIlzbT0foDEl35J3c9DtKR1fC7K_Tkaw`;
    
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
        requestType: "PASSWORD_RESET",
        email: email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setMessage("Password reset email sent. Check your inbox.");
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
      });
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <p>Enter your email address to reset your password:</p>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
      <p>{message}</p>
    </div>
  );
};

export default ForgetPassword;
