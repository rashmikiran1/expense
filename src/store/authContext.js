import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  email:"",
  isLoggedIn: false,
  login: (token,email) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [email, setEmail] = useState(localStorage.getItem('email')||"");
  const userLoggedIn = !!token;
  const loginHandler = (token,email) => {
    setToken(token);
    setEmail(email);
    localStorage.setItem('token', token);
    localStorage.setItem('email',email)
  };

  const logoutHandler = () => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  };

  useEffect(() => {
    const idleTimeout = 5 * 60 * 1000;
    let timeoutId;

    const resetIdleTimeout = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        logoutHandler(); 
      }, idleTimeout);
    };
    resetIdleTimeout();
  }, []);

  const contextValue = {
    token: token,
    email:email,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
