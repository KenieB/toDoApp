import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TodoListLayout from "../todoList/TodoListLayout";
import UserAccessPrompt from "./UserAccessPrompt";
import "../App.css";

function EnterApp({
  activeUser,
  setActiveUser,
  hasAccessToken,
  setNewUserFlag,
  appErr,
  setAppErr,
}) {
  useEffect(() => {
    if (Object.keys(activeUser).length && !hasAccessToken) {
      const invalidSession = new Error(
        "Invalid session. Please login again to validate."
      );
      setAppErr(invalidSession);
    }
  }, []);

  if (Object.keys(activeUser).length && hasAccessToken) {
    return (
      <Container
        className="d-flex justify-content-center h-100"
        id="user-view-container"
      >
        <Row id="user-view-row">
          <Col className="d-flex align-items-center" id="user-view-col">
            <Container fluid id="user-view-element-container">
              <h1>Todo List</h1>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container
        className="d-flex justify-content-center h-100"
        id="user-view-container"
      >
        <Row id="user-view-row">
          <Col className="d-flex align-items-center" id="user-view-col">
            <Container fluid id="user-view-element-container">
              <UserAccessPrompt
                activeUser={activeUser}
                setActiveUser={setActiveUser}
                setNewUserFlag={setNewUserFlag}
                appErr={appErr}
                setAppErr={setAppErr}
              />
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default EnterApp;
