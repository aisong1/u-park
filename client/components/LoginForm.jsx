import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import styles from './styles/Form.css';

const LoginForm = ({ handleLoginSubmit, handleBackClick, signUpSuccess, failed }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.formContainer}>
      {signUpSuccess ? (
        <div>
          <Alert variant="success">
            <Alert.Heading>{'Account created.'}</Alert.Heading>
            <p>
              Login to find the best parking spots in Seattle today!
            </p>
          </Alert>
        </div>
      ) : (
        <></>
      )}
      {failed ? (
        <div>
          <Alert variant="danger">
            <Alert.Heading>{'Login failed.'}</Alert.Heading>
            <p>
              Double check that you have input 
              your information correctly and try again.
            </p>
          </Alert>
        </div>
      ) : (
        <></>
      )}
      <Form onSubmit={(e) => handleLoginSubmit(e, email, password)}>
        <Form.Group controlId="loginEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            onChange={setEmail}
          />
        </Form.Group>
        <Form.Group controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            onChange={setPassword}
          />
        </Form.Group>
        <div className={styles.submit}>
          <Button variant="dark" type="submit">
            Submit
          </Button>
          <Button variant="outline-secondary" type="submit" onClick={handleBackClick}>
            Back
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
