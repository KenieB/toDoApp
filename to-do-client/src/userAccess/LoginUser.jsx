import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import UserAccessForm from "./UserAccessForm";

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
    console.log("[LOGIN] activeUser: ", activeUser);
    console.log("[LOGIN] hasAccessToken: ", hasAccessToken);
    console.log("[LOGIN] newUserFlag: ", newUserFlag);
    console.log("[LOGIN] appErr: ", appErr);
  }, []);
  return (
    <>
      <h1>LOGIN USER</h1>
      <h2>UserAccessForm</h2>
    </>
  );
}

export default LoginUser;
