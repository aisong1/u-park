import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HomePage from './HomePage';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import Map from './Map';
import styles from './styles/App.css';

const App = () => {
  const [page, setPage] = useState(0);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [signUpFailed, setSignUpFailed] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  let render = null;

  useEffect(() => {}, [page, signUpFailed, loginFailed]);

  const handleSignUpClick = () => {
    setPage(1);
  };
    
  const handleLoginClick = () => {
    setPage(2);
  };

  const handleSignUpSubmit = (e, firstName, lastName, email, password) => {
    e.preventDefault();
    if (firstName.target === undefined ||
        lastName.target === undefined ||
        email.target === undefined ||
        password.target === undefined) {
          setSignUpFailed(true);
    } else {
      axios.post('/api/parking/users', {
        'firstName': firstName.target.value,
        'lastName': lastName.target.value,
        'email': email.target.value,
        'password': password.target.value,
      })
      .then(({ data }) => {
        if (Array.isArray(data)) {
          setPage(2);
          setSignUpSuccess(true);
        } else {
          setPage(1);
          setSignUpFailed(true);
        }
      })
    }
  }

  const handleLoginSubmit = (e, email, password) => {
    e.preventDefault();
    if (email.target === undefined || password.target === undefined) {
      setLoginFailed(true);
    } else {
      axios.get('/api/parking/users', {
        params: {
          'email': email.target.value,
          'password': password.target.value,
        },
      })
      .then(({ data }) => {
        if (data.length > 0) {
          setPage(3);
        } else {
          setPage(2);
          setLoginFailed(true);
        }
      });
    }
  }

  const handleBackClick = () => {
    setPage(0);
    setSignUpSuccess(false);
    setSignUpFailed(false);
    setLoginFailed(false);
  }

  if (page === 0) { // Home Page
    render = (
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.leftContent}>
            <h1>WePark</h1>
            <p>Parking simplified.</p>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.rightContent}>
            <HomePage
              handleSignUpClick={handleSignUpClick}
              handleLoginClick={handleLoginClick}
            />
          </div>
        </div> 
      </div>
    )
  } else if (page === 1) { // Sign Up 
    render = (
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.leftContent}>
            <h1>WePark</h1>
            <p>Parking simplified.</p>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.rightContent}>
            <SignUpForm 
              handleSignUpSubmit={handleSignUpSubmit}
              handleBackClick={handleBackClick}
              failed={signUpFailed}
            />
          </div>
        </div> 
      </div>
    )
  } else if (page === 2) { // Login
    render = (
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.leftContent}>
            <h1>WePark</h1>
            <p>Parking simplified.</p>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.rightContent}>
            <LoginForm 
              handleLoginSubmit={handleLoginSubmit}
              handleBackClick={handleBackClick}
              signUpSuccess={signUpSuccess}
              failed={loginFailed}
            />
          </div>
        </div> 
      </div>
    )
  } else { // Map
    render = <Map />
  }
  return (
    <>
      {render}
    </>
  )
};

export default App;
