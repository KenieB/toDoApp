import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { registerNewUser, loginUser } from "../utils/api";
import ErrorAlert from "../utils/ErrorAlert";

function UserAccessForm({
  activeUser,
  setActiveUser,
  hasAccessToken,
  setHasAccessToken,
  appErr,
  setAppErr,
  newUserFlag,
  setNewUserFlag,
}) {
  const navigate = useNavigate();
  const location = useLocation();
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
  const initFormState = () => (newUserFlag ? newUserInit : existingUserInit);

  const [formData, setFormData] = useState(initFormState());

  // Click/Change/Submit Handlers
  const handleChange = ({ target }) => {
    setAppErr(null);
    setFormData({
      ...formData,
      [target.id]: target.value,
    });
  };

  const handleCancel = () => {
    setAppErr(null);
    setNewUserFlag(false);
    navigate("/");
  };

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setActiveUser({});
    setAppErr(null);
    async function validateUserLogin() {
      try {
        const userLogin = {
          ...formData,
        };
        const response = await loginUser(userLogin, abortController.signal);
        setActiveUser({ id: response.user_id, name: response.user_name });
        setHasAccessToken(response.access_token);
      } catch (error) {
        setAppErr(error);
      }
    }
    validateUserLogin();
    return () => abortController.abort();
  };

  const handleSubmitRegister = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setActiveUser({});
    setAppErr(null);
    async function validateUserRegistration() {
      try {
        if (formData.password !== formData.password_confirm) {
          setAppErr(
            new Error(
              "Password and Confirm Password fields must match. Please review and re-submit."
            )
          );
        } else {
          const newUser = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            password: formData.password,
          };
          const response = await registerNewUser(
            newUser,
            abortController.signal
          );
          setActiveUser({ id: response.user_id, name: response.user_name });
          setHasAccessToken(response.access_token);
        }
      } catch (error) {
        setAppErr(error);
      }
    }
    validateUserRegistration();
    return () => abortController.abort();
  };

  useEffect(() => {
    setAppErr(null);
    setActiveUser({});
    setHasAccessToken(false);
    if (location.pathname === "/access/register") {
      setNewUserFlag(true);
    } else {
      setNewUserFlag(false);
    }
  }, []);

  useEffect(() => {
    if (hasAccessToken && Object.keys(activeUser).length) {
      navigate("/todo/list");
    }
  }, [activeUser, hasAccessToken]);

  if (newUserFlag) {
    return (
      <>
        <Row>
          <ErrorAlert error={appErr} />
        </Row>
        <Row>
          <Col>
            <Form onSubmit={handleSubmitRegister}>
              <Form.Group className="my-3" controlId="first_name">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter first name"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="my-3" controlId="last_name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter last name"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                  required
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="my-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter password"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="my-3" controlId="password_confirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Re-enter password to confirm"
                  onChange={handleChange}
                />
              </Form.Group>
              <Row className="mt-3">
                <Col>
                  <Button variant="dark" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button variant="info" type="submit">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </>
    );
  } else {
    return (
      <>
        <Row>
          <Col>
            <Form onSubmit={handleSubmitLogin}>
              <Form.Group className="my-3">
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                  required
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                  required
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  onChange={handleChange}
                />
              </Form.Group>
              <Row>
                <Col>
                  <Button variant="dark" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button variant="info" type="submit">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </>
    );
  }
}

export default UserAccessForm;
