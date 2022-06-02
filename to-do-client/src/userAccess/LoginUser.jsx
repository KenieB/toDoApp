import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import UserAccessForm from "./UserAccessForm";
import ErrorAlert from "../utils/ErrorAlert";

function LoginUser({
  activeUser,
  setActiveUser,
  hasAccessToken,
  setHasAccessToken,
  appErr,
  setAppErr,
  newUserFlag,
  setNewUserFlag,
}) {
  useEffect(() => {
    setNewUserFlag(false);
  }, []);
  return (
    <>
      <Row>
        <Col>
          <h1 className="display-1 text-center">User Login</h1>
        </Col>
      </Row>
      <Row>
        <ErrorAlert err={appErr} />
      </Row>
      <Row>
        <Col>
          <UserAccessForm
            activeUser={activeUser}
            setActiveUser={setActiveUser}
            hasAccessToken={hasAccessToken}
            setHasAccessToken={setHasAccessToken}
            appErr={appErr}
            setAppErr={setAppErr}
            newUserFlag={newUserFlag}
            setNewUserFlag={setNewUserFlag}
          />
        </Col>
      </Row>
    </>
  );
}

export default LoginUser;
