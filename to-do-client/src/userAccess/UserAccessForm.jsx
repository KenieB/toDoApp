import React, { useState } from "react";
import { Form, Container } from "react-bootstrap";

function UserAccessForm({
  setActiveUser,
  setHasAccessToken,
  appErr,
  setAppErr,
  newUserFlag,
}) {
  const newUserInit = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirm: "",
  };
  const existingUserInit = {
    email: "",
    password: "",
  };
  const initFormState = () => (newUser ? newUserInit : existingUserInit);

  const [formData, setFormData] = useState(initFormState());

  // Click/Change/Submit Handlers
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };
  const handleCancel = () => {
    history.goBack();
  };

  /*
 const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setNewReservationDate("");
    async function createNewReservation() {
      try {
        const newReservationRequest = {
          ...formData,
          people: Number(formData.people),
        };
        const response = await createReservation(
          newReservationRequest,
          abortController.signal
        );
        setNewReservationDate(response.reservation_date);
      } catch (error) {
        setReservationsError(error);
      }
    }
    createNewReservation();
    return () => abortController.abort();
  };
  */

  /* if (newUserFlag) {
    return (
      <>
        <Form>
          <Form.Group className="" controlId="first_name">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" />
          </Form.Group>
          <Form.Group className="" controlId="last_name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" />
          </Form.Group>
          <Form.Group className="" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" />
          </Form.Group>
          <Form.Group className="" controlId="password_confirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-enter password to confirm"
            />
          </Form.Group>
        </Form>
      </>
    );
  } else {
    return (
      <>
        <Form>
          <Form.Group className="" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email address" />
          </Form.Group>
          <Form.Group className="" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" />
          </Form.Group>
        </Form>
      </>
    );
  }*/
  return <h1>UserAccessForm</h1>;
}

export default UserAccessForm;
