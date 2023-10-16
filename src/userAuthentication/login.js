import React, { useRef, useState, useContext} from 'react';
import classes from '../style/signup.module.css';
import { Link } from 'react-router-dom';
import AuthContext from '../store/authContext';

function Login() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const authCtx = useContext(AuthContext);
  const [isLogin, setisLogin] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  const passwordInputType = passwordVisible ? 'text' : 'password';

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

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
          window.location.href = '/home';
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication Failed';
            console.error('API Error:', data.error);
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        if(isLogin) {
          authCtx.login(data.idToken, data.email);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={classes.contactContainer}>
      <h1 className={classes.title}>login</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div>
          <label className={classes.label} htmlFor="email">
            Email:
          </label>
          <input
            className={classes.input}
            type="email"
            id="email"
            name="email"
            required
            ref={emailInputRef}
          />
        </div>

        <div>
          <label className={classes.label} htmlFor="password">
            Password:
          </label>
          <div className={classes.passwordinput}>
            <input
              className={classes.input}
              type={passwordInputType}
              id="password"
              name="password"
              required
              ref={passwordInputRef}
            />
            <button
              type="button"
              className={classes.togglePassword}
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <div className={classes.but}>
        <button type="button" className={classes.forget}>
          <Link to ="/forgetpassword">  Forget Password ?</Link>
          </button>
          <button type="submit" className={classes.submitButton}>
            Login
          </button>
          <div>
            <button className={classes.text} type="button">
              Don't have an account? <Link to="/">sign up</Link>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
