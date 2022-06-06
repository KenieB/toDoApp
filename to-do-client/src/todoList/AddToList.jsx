import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import ErrorAlert from "../utils/ErrorAlert";
import { addToList, loadList } from "../utils/api";
import {
  sortItemsByTitleAsc,
  sortItemsByTitleDesc,
  sortItemsByDueDateDesc,
} from "./sortListItems";

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
  newItemFlag,
  setNewItemFlag,
}) {
  const navigate = useNavigate();
  const initNewItem = {
    title: "",
    description: "",
    due_date: "",
  };
  const [formData, setFormData] = useState(initNewItem);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.id]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    async function createNewListItem() {
      try {
        const newTdItem = {
          ...formData,
        };
        /*console.log(
          "--------------- AddToList (submitted item) ---------------"
        );
        console.log(Object.entries(newTdItem));
        console.log(
          "----------------------------------------------------------"
        );*/
        const response = await addToList(
          activeUser.id,
          newTdItem,
          abortController.signal
        );
        /*.then((data) => {
          setNewItemFlag(true);
          return data;
        });*/
      } catch (error) {
        setAppErr(error);
      }
    }

    createNewListItem();
    setNewItemFlag(true);
    //navigate("/todo/list");
    return () => abortController.abort();
  };

  async function loadUserList() {
    const abortController = new AbortController();
    try {
      const response = await loadList(activeUser.id, abortController.signal);

      if (listSort === "due-date-asc") {
        setUserTodoList(response);
      } else if (listSort === "due-date-desc") {
        const listByDueDateDesc = sortItemsByDueDateDesc(response);
        setUserTodoList(listByDueDateDesc);
      } else if (listSort === "title-asc") {
        const listByTitleAsc = sortItemsByTitleAsc(response);
        setUserTodoList(listByTitleAsc);
      } else if (listSort === "title-desc") {
        const listByTitleDesc = sortItemsByTitleDesc(response);
        setUserTodoList(listByTitleDesc);
      } else {
        throw new Error("List sort error. Contact admin.");
      }
    } catch (error) {
      setAppErr(error);
    }

    return userTodoList;
  }

  useEffect(() => {
    console.log(`AddToList useEffect - newItemFlag: ${newItemFlag}`);
    if (newItemFlag) {
      setAppErr(null);
      loadUserList();
      setNewItemFlag(false);
      navigate("/todo/list");
    }
  }, [newItemFlag]);

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
            <Form id="add-to-list-form" onSubmit={handleSubmit}>
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
              <Form.Group className="my-3" controlId="due_date">
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
                      className="flex-fill fs-4 py-0 fst-italic"
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
