import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ErrorAlert from "../layout/ErrorAlert";

function UserAccessLayout({
  activeUser,
  setActiveUser,
  hasAccessToken,
  setHasAccessToken,
  newUserFlag,
  setNewUserFlag,
  appErr,
  setAppErr
}) {
  /*
        useEffect(() => {
            if (activeUser.first_name && !hasAccessToken) {
                setAppErr(new Error("Invalid session. Please login again to validate."));
            }
        }, [activeUser, hasAccessToken]);
    */
  return (
    <>
      <Container className="d-flex justify-content-center h-100">
        <Row>
          <Col className="d-flex align-items-center">
            <Container fluid>
              <h1>UserAccessLayout</h1>
              <Outlet />
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserAccessLayout;
