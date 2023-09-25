import React, {useRef, useState} from 'react';
import classes from '../style/signup.module.css';
import { Link } from 'react-router-dom';

function SignupForm() {
  const emailinputRef = useRef();
  const passwordinputRef= useRef();
  const confirmPasswordInputRef = useRef();

const handleSubmit = (event) => {
  event.preventDefault();
  const email = emailinputRef.current.value;
  const password = passwordinputRef.current.value;
  const confirmPassword = confirmPasswordInputRef.current.value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  
    const url = 
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
          window.location.href = '/login'; 
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication Failed';
            console.error('API Error:', data.error);
            throw new Error(errorMessage)
          });
        }
      })
      .catch((err) => {
        alert(err.message)
      });

  };
  
  return (
    <div className={classes.contactContainer}>
      <h1 className={classes.title} >sign up</h1>
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
        <label className={classes.label} htmlFor="confirmPassword">
            Confirm Password:
        </label>
        <input
            className={classes.input}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            ref={confirmPasswordInputRef}
        />
        </div>
        <div className={classes.but}>
        <button  type="submit" className={classes.submitButton}>
            sign up</button>
        <div>
          <button className={classes.text} type='button'>
            Already have an account?<Link to ='/login'>login</Link></button>
        </div>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
