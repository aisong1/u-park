import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const LoginForm = ({ handleLoginSubmit, handleBackClick }) => (
  <div>
    <Form onSubmit={(e) => handleLoginSubmit(e)}>
      <Form.Group controlId="loginEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group controlId="loginPassword">
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

export default LoginForm;
