import React, { useState, useRef, useContext } from 'react';
import AuthContext from '../store/authContext';

function Profile() {
  const [fullName, setFullName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [image, setImage] = useState('');

  const fullNameRef = useRef();
  const imageRef = useRef();
  const authCtx = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const displayName = fullNameRef.current.value;
    const image = imageRef.current.value;
    Profile(displayName);
  };

  const Profile = (displayName) => {
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCGIlzbT0foDEl35J3c9DtKR1fC7K_Tkaw&idToken=${authCtx.token}`, {
        method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        displayName: displayName,
        photoUrl: image,
        returnSecureToken: true,
    
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
        
      })
      .then(() => {
        setSuccessMessage('Profile updated successfully');
        window.location.href='./update';
        setErrorMessage('');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        setErrorMessage('Error updating profile. Please try again later.');
        setSuccessMessage('');
      });
  };

  return (
    <div>
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            ref={fullNameRef}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">image:</label>
          <input
            type="file"
            id="image"
            ref={imageRef}
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
}

export default Profile;
