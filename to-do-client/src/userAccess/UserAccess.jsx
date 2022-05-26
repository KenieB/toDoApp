import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

function UserAccess({ setActiveUser, newUserFlag, setNewUserFlag }) {
  
  const navigate = useNavigate();
  //User Access Button Click Handlers
  // Register => setNewUserFlag(true) + navigate("register")
  // Login => navigate("login")
  return (
    <>
      <Row id="app-intro-row">
        <Col id="app-intro-col">
          <h6 className="display-6 text-center" id="app-intro-header">
            To access or create your to-do list,
            <br />
            please login or register:
          </h6>
        </Col>
      </Row>
      <Row id="user-access-row">
        <Col xs={{ span: 10, offset: 1 }} id="user-access-col">
          {/*START - UserAccessForm-jsx */}
          <Row className="gap-3 gap-md-0" id="user-access-btn-row">
            <Col className="px-0" id="user-access-btn-col-rgstr">
              <Container
                className="d-flex justify-content-center"
                id="user-access-btn-container-rgstr"
              >
                <Button
                  variant="secondary"
                  className="fs-4 fs-md-2 flex-fill"
                  style={{ fontVariant: "small-caps" }}
                  id="user-access-btn-rgstr"
                >
                  Register
                </Button>
              </Container>
            </Col>
            <Col className="px-0" id="user-access-btn-col-login">
              <Container
                className="d-flex justify-content-center"
                id="user-access-btn-container-login"
              >
                <Button
                  variant="info"
                  className="fs-4 fs-md-2 flex-fill"
                  style={{ fontVariant: "small-caps" }}
                  id="user-access-btn-login"
                >
                  Login
                </Button>
              </Container>
            </Col>
          </Row>
          {/*END - UserAccessForm-jsx */}
        </Col>
      </Row>
    </>
  );
}

export default UserAccess;
