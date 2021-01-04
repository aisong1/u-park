import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignUpForm = ({ handleSignUpSubmit, handleBackClick }) => {
  return (
    <div>
      <Form onSubmit={(e) => handleSignUpSubmit(e)}>
        <Form.Group controlId="signupFirstName">
          <Form.Label>First name</Form.Label>
          <Form.Control type="text" placeholder="Enter first name" />
        </Form.Group>
        <Form.Group controlId="signupLastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control type="text" placeholder="Enter last name" />
        </Form.Group>
        <Form.Group controlId="signupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="signupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="dark" type="submit">
          Submit
        </Button>
        <Button variant="outline-secondary" type="submit" onClick={handleBackClick}>
          Back
        </Button>
      </Form>
    </div>
  )
};

export default SignUpForm;