import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

function NotFound() {
  const overlayStyle = {
    fontWeight: '700',
    fontVariant: 'small-caps',
    fontStyle: 'oblique',
    fontSize:  '5vw',
    color: '#EA472C'
  }
  return (
    <>
      <Row className="py-1 py-md-5">
        <Col md={{ span: 8, offset: 2 }} className="card border-0">
          <Image fluid src="/src/images/404.png" className="card-img" />
          <Container className="card-img-overlay d-flex ms-4">
            <h1 className="card-title text-center" style={overlayStyle}>Uh-Oh!<br /> Nothing Here!</h1>
          </Container>
        </Col>
      </Row>
    </>
  );
}

export default NotFound;
