import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

function Layout() {
  return (
    <Row style={{ height: "100vh" }} id="root-layout-row">
      <Col xs={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} id="root-layout-col">
        <Container
          fluid
          className="bg-light overflow-scroll border border-secondary rounded-3"
          style={{ height: "85vh", marginTop: "7.5vh" }}
          id="root-layout-container"
        >
          <Outlet />
        </Container>
      </Col>
    </Row>
  );
}

export default Layout;
