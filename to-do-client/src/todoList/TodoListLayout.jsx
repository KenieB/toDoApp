import React from "react";
import { Container, Row, Col, CardGroup } from "react-bootstrap";

function TodoListLayout() {
  /* [[UserAccess layout]]

        <Row id="app-intro-row">
            <Col id="app-intro-col">
                <h6 className="display-6 text-center" id="app-intro-header">
                </h6>
            </Col>
        </Row>
        <Row id="user-access-row">
            <Col xs={{ span: 10, offset: 1 }} id="user-access-col">
                < UserAccessForm />
            </Col>
        </Row>
    */
  return (
    <Row>
      <Col>
        <CardGroup></CardGroup>
      </Col>
    </Row>
  );
}

export default TodoListLayout;
