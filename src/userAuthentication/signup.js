import React, { useContext, useRef, useState, } from 'react';
import classes from '../style/signup.module.css';
import Authcontext from '../store/authContext';

function SignupForm() {
  const emailinputRef = useRef();
  const passwordinputRef= useRef();
  const authCtx = useContext(Authcontext);
  const [isLogin, setisLogin] = useState(true);
   
  const switchHandler = () => {
    setisLogin((prevstate) => !prevstate)
}

const handleSubmit = (event) => {
  event.preventDefault();
  const email = emailinputRef.current.value;
  const password = passwordinputRef.current.value;
    const url = isLogin ?
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGIlzbT0foDEl35J3c9DtKR1fC7K_Tkaw' :
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGIlzbT0foDEl35J3c9DtKR1fC7K_Tkaw';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication Failed';
            console.error('API Error:', data.error);
            throw new Error(errorMessage)
          });
        }
      })
      .then((data) => {
        if (isLogin) {
          authCtx.login(data.idToken, data.email);
        }
      })
      
      .catch((err) => {
        alert(err.message)
      });
  };
  return (
    <div className={classes.contactContainer}>
      <h1 className={classes.title} >{isLogin ? "sign up" : "login"}</h1>
      <form  className={classes.form} onSubmit={handleSubmit}>
        <div>
          <label className={classes.label} htmlFor="email">Email:</label>
          <input className={classes.input}
            type="email"
            id="email"
            name="email"
            required ref={emailinputRef}
          />
        </div>

        <div>
          <label  className={classes.label} htmlFor="password">Password:</label>
          <input className={classes.input}
            type="password"
            id="password"
            name="password"
            
            required ref={passwordinputRef}
          />
        </div>
        <div>
        <label className={classes.label} htmlFor="confirmpassword">Confirm Password:</label>
          <input className={classes.input}
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            required ref={emailinputRef}
          />
        </div>
        <div className={classes.but}>
        <button  type="submit" className={classes.submitButton}>
            {isLogin? 'create account' : 'login'}</button>
        <div>
          <button className={classes.submitButton} type="button" onClick={switchHandler}>
            {isLogin? 'login with existing account' : 'create account'}</button>
        </div>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
