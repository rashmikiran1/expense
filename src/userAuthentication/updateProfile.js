import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../store/authContext';

function ViewProfile() {
  const [fullName, setFullName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = () => {
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCGIlzbT0foDEl35J3c9DtKR1fC7K_Tkaw&idToken=${authCtx.token}`, {
        method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
    
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
            console.log("vjhgyug")
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.users && data.users.length >= 0) {
          const user = data.users[0];
          if (user.photoUrl) {
            setFullName(user.photoUrl);
          }
        }
      })
      .catch((error) => {
        console.error('Error retrieving profile data:', error);
        setErrorMessage('Error retrieving profile data. Please try again later.');
      });
  };

  return (
    <div>
      <h2>View Profile</h2>
      <p>Full Name: {fullName}</p>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
}

export default ViewProfile;
