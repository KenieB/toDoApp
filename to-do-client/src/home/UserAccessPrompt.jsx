import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import ErrorAlert from "../layout/ErrorAlert";

function UserAccessPrompt({ activeUser, setActiveUser, setNewUserFlag, appErr, setAppErr }) {
  const navigate = useNavigate();

  //User Access Button Click Handlers
  const loginClickHandler = (event) => {
    event.preventDefault();
    if(Object.keys(activeUser).length) {
      setActiveUser({});
    }
    setAppErr(null);
    navigate("/access/login");
  };
  const registerClickHandler = (event) => {
    event.preventDefault();
    if(Object.keys(activeUser).length) {
      setActiveUser({});
    }
    setNewUserFlag(true);
    setAppErr(null);
    navigate("/access/register");
  };

  return (
    <>
      <Row>
        <Col>
          <ErrorAlert error={appErr} />
        </Col>
      </Row>
      <Row id="td-app-intro-row" className="mb-2 mb-md-5">
        <Col id="td-app-intro-col">
          <h6 className="display-6 text-center" id="td-app-intro-header">
            Please login or register to
            <br />
            access or create your to-do list:
          </h6>
        </Col>
      </Row>
      <Row id="user-access-row" className="my-2 my-md-5">
        <Col xs={{ span: 10, offset: 1 }} id="user-access-col">
          <Row className="gap-3 gap-md-0" id="user-access-btn-row">
            <Col className="px-0" id="user-access-btn-col-rgstr">
              <Container
                className="d-flex justify-content-center"
                id="user-access-btn-container-rgstr"
              >
                <Button
                  variant="secondary"
                  className="fs-4 fs-md-2 flex-fill"
                  style={{ fontVariant: "small-caps" }}
                  id="user-access-btn-rgstr"
                  onClick={registerClickHandler}
                >
                  Register
                </Button>
              </Container>
            </Col>
            <Col className="px-0" id="user-access-btn-col-login">
              <Container
                className="d-flex justify-content-center"
                id="user-access-btn-container-login"
              >
                <Button
                  variant="info"
                  className="fs-4 fs-md-2 flex-fill"
                  style={{ fontVariant: "small-caps" }}
                  id="user-access-btn-login"
                  onClick={loginClickHandler}
                >
                  Login
                </Button>
              </Container>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default UserAccessPrompt;
