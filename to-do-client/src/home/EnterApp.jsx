import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TodoListLayout from "../todoList/TodoListLayout";
import UserAccessPrompt from "./UserAccessPrompt";
import "../App.css";

function EnterApp({
  activeUser,
  setActiveUser,
  hasAccessToken,
  setHasAccessToken,
  setNewUserFlag,
  appErr,
  setAppErr,
}) {
  useEffect(() => {
    if (
      (Object.keys(activeUser).length && !hasAccessToken) ||
      (!Object.keys(activeUser).length && hasAccessToken)
    ) {
      const invalidSession = new Error("Invalid session. Please login again.");
      setActiveUser({});
      setHasAccessToken(false);
      setAppErr(invalidSession);
    }
    /*if(Object.keys(activeUser).length && hasAccessToken) {
      api.logout()
      setActiveUser({});
      setHasAccessToken(false);
      setAppErr(new Error("Active session terminated by new session request. Login to use your list."))
    } else {
      --
    }*/
  }, []);

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

export default EnterApp;
