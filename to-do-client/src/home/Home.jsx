import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../App.css";

function Home() {
  const navigate = useNavigate();

  const clickHandler = (event) => {
    event.preventDefault();
    navigate("/enter");
  };

  const entryBtnStyle = {
    fontVariant: "small-caps",
    fontSize: "1.75rem",
  };

  return (
    <Container className="d-flex justify-content-center h-100">
      <Row>
        <Col className="d-flex align-items-center">
          <Container fluid>
            <Row id="td-app-header-row">
              <Col id="td-app-header-col">
                <h1
                  id="td-app-header"
                  className="display-1 text-center"
                  style={{ fontVariant: "small-caps" }}
                >
                  Welcome to Your
                  <br className="d-block d-md-none" />
                  <span className="d-none d-md-block"> </span>To-Do List!
                </h1>
                <hr className="border rounded-2" style={{ height: "0.5em" }} />
              </Col>
            </Row>
            <Container
              id="home-entry-container"
              fluid
              className="d-flex h-25 px-0 pb-5 justify-content-center align-content-stretch"
            >
              <Row
                id="home-entry-container-row"
                className="justify-content-center"
              >
                <Col id="home-entry-container-col">
                  <Button
                    variant="outline-success"
                    onClick={clickHandler}
                    className="flex-fill lh-lg"
                    style={entryBtnStyle}
                  >
                    Get Started
                  </Button>
                </Col>
              </Row>
            </Container>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
