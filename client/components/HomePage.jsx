import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from './styles/HomePage.css';

const HomePage = ({ handleSignUpClick, handleLoginClick }) => (
  <div className={styles.container}>
    <Button 
      type="submit" 
      variant="dark" 
      size="lg"
      onClick={handleSignUpClick}
    >
      Sign Up
    </Button>
    <b/>
    <Button 
      type="submit" 
      variant="dark" 
      size="lg"
      onClick={handleLoginClick}
    >
      Login
    </Button>
  </div>
);

export default HomePage;