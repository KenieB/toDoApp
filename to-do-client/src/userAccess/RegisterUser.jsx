import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import UserAccessForm from "./UserAccessForm";
import ErrorAlert from "../layout/ErrorAlert";

function RegisterUser({
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
    console.log("[REGISTER] activeUser: ", activeUser);
    console.log("[REGISTER] hasAccessToken: ", hasAccessToken);
    console.log("[REGISTER] newUserFlag: ", newUserFlag);
    console.log("[REGISTER] appErr: ", appErr);
  }, []);
  return (
    <>
      <Row>
        <Col>
          <h1 className="display-1 text-center">User Registration</h1>
        </Col>
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

export default RegisterUser;
