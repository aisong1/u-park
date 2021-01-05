import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import styles from './styles/Form.css';

const SignUpForm = ({ handleSignUpSubmit, handleBackClick, failed }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.formContainer}>
      {failed ? (
        <div>
          <Alert variant="danger">
            <Alert.Heading>{'Sign up failed.'}</Alert.Heading>
            <p>
              Double check that you have filled out all forms and try again.
            </p>
          </Alert>
        </div>
      ) :
      (
        <></>
      )}
      <Form onSubmit={(e) => handleSignUpSubmit(e, firstName, lastName, email, password)}>
        <Form.Group controlId="signupFirstName">
          <Form.Label>First name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter first name" 
            onChange={setFirstName}
          />
        </Form.Group>
        <Form.Group controlId="signupLastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter last name" 
            onChange={setLastName}
          />
        </Form.Group>
        <Form.Group controlId="signupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email"
            onChange={setEmail}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="signupPassword">
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
  )
};

export default SignUpForm;