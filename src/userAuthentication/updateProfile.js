import React, { useRef, useState , useEffect} from 'react';
import classes from '../style/signup.module.css';

function Updateprofile() {
  const fullnameInputRef = useRef();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const fullname = fullnameInputRef.current.value;
    useEffect(() => {
    const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCGIlzbT0foDEl35J3c9DtKR1fC7K_Tkaw';

      fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data); // Update state with user data
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        // Handle error loading user data
        setLoading(false);
      });
  }, []);
  }
  return (
    <div className={classes.contactContainer}>
      <h1 className={classes.title}>login</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div>
          <label className={classes.label} htmlFor="text">
            Full name:
          </label>
          <input
            className={classes.input}
            type="text"
            id="fullname"
            name="fullname"
            required
            ref={fullnameInputRef}
          />
        </div>
        <div className={classes.but}>
          <button type="submit" className={classes.submitButton}>
            Update
          </button>
          <div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Updateprofile;
