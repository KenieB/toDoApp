import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import ErrorAlert from "../layout/ErrorAlert";

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
  /*
        useEffect(() => {
            if (activeUser.first_name && !hasAccessToken) {
                setAppErr(new Error("Invalid session. Please login again to validate."));
            }
        }, [activeUser, hasAccessToken]);
    */
  return (
    <>
      <h1>UserAccessLayout</h1>
    </>
  );
}

export default UserAccessLayout;
