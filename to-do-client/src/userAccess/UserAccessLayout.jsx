import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
function UserAccessLayout({
  activeUser,
  setActiveUser,
  hasAccessToken,
  setHasAccessToken,
  newUserFlag,
  setNewUserFlag,
  appErr,
  setAppErr,
}) {
  return (
    <>
      <Container
        id="user-access-layout-container"
        className="d-flex justify-content-center w-100 h-100"
      >
        <Row id="user-access-layout-row" className="w-100">
          <Col
            id="user-access-layout-col"
            className="d-flex align-items-center"
          >
            <Container fluid id="user-access-layout-outlet">
              <Outlet />
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserAccessLayout;
