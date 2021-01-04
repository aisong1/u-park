import React, { useState, useEffect } from 'react';
import HomePage from './HomePage';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import Map from './Map';
import styles from './styles/App.css';

const App = () => {
  const [page, setPage] = useState(0);
  let render = null;

  useEffect(() => {}, [page]);

  const handleSignUpClick = () => {
    setPage(1);
  };
    
  const handleLoginClick = () => {
    setPage(2);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    console.log('Sign up submitted!');
    setPage(3);
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted!');
    setPage(3);
  }

  const handleBackClick = (e) => {
    e.preventDefault();
    setPage(0);
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
