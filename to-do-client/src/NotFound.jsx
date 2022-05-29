import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Image, Button } from "react-bootstrap";

function NotFound() {
  const navigate = useNavigate();

  const clickHandler = (event) => {
    event.preventDefault();
    navigate("/");
  };
  return (
    <>
      <Container
        fluid
        className="d-flex flex-column justify-content-evenly h-100"
        style={{ backgroundColor: "#8FD8FB" }}
      >
        <Row>
          <Image fluid src="/src/images/404.svg" />
        </Row>
        <Row className="px-5 mx-5">
          <Button
            variant="outline-secondary"
            onClick={clickHandler}
            className="flex-fill"
            style={{
              fontVariant: "small-caps",
              fontWeight: 700,
              letterSpacing: "1rem",
              fontSize: "1.6rem",
            }}
          >
            Return Home
          </Button>
        </Row>
      </Container>
    </>
  );
}

export default NotFound;
