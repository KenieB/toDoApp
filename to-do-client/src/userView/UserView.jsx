import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TodoListLayout from "../todoList/TodoListLayout";
import UserAccess from "../userAccess/UserAccess";
import "../App.css";

function UserView({
  activeUser,
  setActiveUser,
  hasAccessToken,
  newUserFlag,
  setNewUserFlag,
  setHasAccessToken,
  appErr,
  setAppErr,
}) {
  useEffect(() => {
    if (Object.keys(activeUser).length) {
      const invalidSession = new Error(
        "Invalid session. Please login again to validate."
      );
      console.log("invalidSession: ", invalidSession);
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
              <TodoListLayout
                activeUser={activeUser}
                setActiveUser={setActiveUser}
                hasAccessToken={hasAccessToken}
                setHasAccessToken={setHasAccessToken}
                appErr={appErr}
                setAppErr={setAppErr}
              />
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
              <UserAccess
                activeUser={activeUser}
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

export default UserView;
