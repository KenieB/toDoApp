import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  ListGroup,
  Button,
  Image,
  Form,
} from "react-bootstrap";
import ErrorAlert from "../utils/ErrorAlert";
//import { addToList } from "../utils/api";

function AddToList({
  activeUser,
  setActiveUser,
  hasAccessToken,
  setHasAccessToken,
  listSort,
  userTodoList,
  setUserTodoList,
  appErr,
  setAppErr,
}) {
  const navigate = useNavigate();
  const initNewItem = {
    title: "",
    description: "",
    "due-date": "",
  };
  const [formData, setFormData] = useState(initNewItem);
  const handleChange = ({ target }) => {
    setAppErr(null);
    setFormData({
      ...formData,
      [target.id]: target.value,
    });
    console.log(formData);
  };
  return (
    <>
      <Container fluid id="add-to-list-form-container" className="py-5 px-0">
        <Row id="add-to-list-form-row">
          <Col
            xs={12}
            md={{ span: 8, offset: 2 }}
            id="add-to-list-form-col"
            className="border border-3 border-secondary rounded-3"
          >
            <Form id="add-to-list-form" onSubmit={() => console.log(formData)}>
              <Form.Group className="my-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Item title"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="my-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={4}
                  placeholder="Item description"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="my-3" controlId="due-date">
                <Form.Label>Due Date</Form.Label>
                <Form.Control required type="date" onChange={handleChange} />
              </Form.Group>
              <Container fluid className="mb-3">
                <Row>
                  <Col className="d-flex">
                    <Button
                      variant="outline-warning"
                      onClick={() => navigate("/todo/list")}
                      className="flex-fill fs-4 py-0 fst-italic text-secondary"
                      style={{
                        fontVariant: "small-caps",
                        letterSpacing: "0.5rem",
                      }}
                    >
                      Cancel
                    </Button>
                  </Col>
                  <Col className="d-flex">
                    <Button
                      variant="warning"
                      type="submit"
                      className="flex-fill fw-bold fs-4 py-0 fst-italic"
                      style={{
                        fontVariant: "small-caps",
                        letterSpacing: "0.5rem",
                      }}
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddToList;
