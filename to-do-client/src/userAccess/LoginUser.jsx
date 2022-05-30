import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

function LoginUser({
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
  return <h1>LOGIN USER</h1>;
}

export default LoginUser;
