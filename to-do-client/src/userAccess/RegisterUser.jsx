import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import UserAccessForm from "./UserAccessForm";

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
    console.log("[REGISTER] activeUser: ", activeUser);
    console.log("[REGISTER] hasAccessToken: ", hasAccessToken);
    console.log("[LOGIN] newUserFlag: ", newUserFlag);
    console.log("[REGISTER] appErr: ", appErr);
  }, []);
  return (
    <>
      <h1>REGISTER USER</h1>
      <h2>UserAccessForm</h2>
    </>
  );
}

export default RegisterUser;
