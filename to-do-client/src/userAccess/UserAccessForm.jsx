import React, { useState } from "react";
import { Form, Container } from "react-bootstrap";

function UserAccessForm({ newUserFlag }) {
  const newUserInit = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_check: "",
  };
  const existingUserInit = {
    email: "",
    password: "",
  };
  const initFormState = () => newUser ? newUserInit : existingUserInit;

  const [formData, setFormData] = useState(initFormState());



  if (newUserFlag) {
    return (
      <>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form>
      </>
    );
  } else {
    return (
      <>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Email address" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form>
      </>
    );
  }
}
