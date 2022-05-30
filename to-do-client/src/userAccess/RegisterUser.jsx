import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

function RegisterUser({
  activeUser,
  setActiveUser,
  hasAccessToken,
  setHasAccessToken,
  appErr,
  setAppErr,
}) {
  useEffect(() => {
    console.log("activeUser: ", activeUser);
    console.log("hasAccessToken: ", hasAccessToken);
    console.log("appErr: ", appErr);
  }, []);
  return <h1>REGISTER USER</h1>;
}

export default RegisterUser;
