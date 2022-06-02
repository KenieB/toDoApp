import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  ListGroup,
  Button,
  Image,
} from "react-bootstrap";
import ErrorAlert from "../utils/ErrorAlert";
import sortItemsByTitle from "./sortItemsByTitle";
//import { loadList, addNewTag, deleteListItem } from "../utils/api";

function TodoList({
  activeUser,
  setActiveUser,
  hasAccessToken,
  setHasAccessToken,
  listSort,
  setListSort,
  userTodoList,
  setUserTodoList,
  appErr,
  setAppErr,
}) {
  const navigate = useNavigate();
  /*
  const todoList = userTodoList.map((user_td_item) => (
    <Container fluid>
      <Row className="border-bottom border-black-50">
        <Col>
          <Card key={user_td_item.td_item_id} className="border-0">
            <Row>
              <Col xs={9}>
                <Card.Body>
                  <Card.Title>{`${user_td_item.title}`}</Card.Title>
                  <Card.Text>{`${user_td_item.description}`}</Card.Text>
                </Card.Body>
                <Card.Footer
                  className="text-center fw-light fst-italic"
                  style={{ fontVariantCaps: "all-small-caps" }}
                >
                  Tags: {user_td_item.tags.join(", ")}
                </Card.Footer>
              </Col>
              <Col xs={3}>
                <Container fluid>
                  <Button variant="danger">
                    <Image fluid src="/src/images/trash-icon.svg" />
                  </Button>
                </Container>
                <Container fluid>
                  <Card.Img
                    src="/src/images/calendar-event-icon.svg"
                    alt="Calendar icon for item due-date"
                  />
                  <Card.ImgOverlay className="text-center">
                    <Card.Subtitle>{`${user_td_item["due-date"]}`}</Card.Subtitle>
                  </Card.ImgOverlay>
                </Container>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  ));
  */

  /* 
    useEffect(() => {

    }, [listSort]);
  */

  return (
    <>
      <Container fluid>
        <h1>TodoList</h1>
      </Container>
    </>
  );
}

export default TodoList;
