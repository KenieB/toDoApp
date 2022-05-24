import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

function Layout() {
  return (
    <Container fluid>
      <Outlet />
    </Container>
  );
}

export default Layout;
