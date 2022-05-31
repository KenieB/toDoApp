import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import UserAccessForm from "./UserAccessForm";
import ErrorAlert from "../layout/ErrorAlert";

function LoginUser({
  activeUser,
  setActiveUser,
  hasAccessToken,
  setHasAccessToken,
  appErr,
  setAppErr,
  newUserFlag,
}) {
  useEffect(() => {
    if (Object.keys(activeUser).length) {
      setActiveUser({});
    }
    if (hasAccessToken) {
      setHasAccessToken(false);
    }
    if (newUserFlag) {
      setNewUserFlag(false);
    }
    console.log("[LOGIN] activeUser: ", activeUser);
    console.log("[LOGIN] hasAccessToken: ", hasAccessToken);
    console.log("[LOGIN] newUserFlag: ", newUserFlag);
    console.log("[LOGIN] appErr: ", appErr);
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
            setActiveUser={setActiveUser}
            setHasAccessToken={setHasAccessToken}
            appErr={appErr}
            setAppErr={setAppErr}
            newUserFlag={newUserFlag}
          />
        </Col>
      </Row>
    </>
  );
}

export default LoginUser;
