import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const LoginForm = ({ handleLoginSubmit, handleBackClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
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
        <Button variant="dark" type="submit">
          Submit
        </Button>
        <Button variant="outline-secondary" type="submit" onClick={handleBackClick}>
          Back
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
