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
import { sortItemsByTitleAsc, sortItemsByTitleDesc } from "./sortListItems";
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
                  <Card.Subtitle>{`${user_td_item["due-date"]}`}</Card.Subtitle>
                </Container>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  ));

  /* 
    useEffect(() => {

    }, [listSort]);
  */

  useEffect(() => {
    setAppErr(null);
    const abortController = new AbortController();
    if (hasAccessToken && Object.keys(activeUser).length) {
      console.log("api.listTodoForUser");
      async function loadUserList() {
        try {
          const response = await loadList(
            activeUser.id,
            abortController.signal
          );
          console.log(response);
          if (listSort === "due-date-asc") {
            setUserTodoList(response);
          } else if (listSort === "due-date-desc") {
            //const listByDueDateDesc = sortItemsByDueDateAsc(response);
            //setUserTodoList(listByDueDateDesc);
          } else if (listSort === "title-asc") {
            const listByTitleAsc = sortItemsByTitleAsc(response);
            setUserTodoList(listByTitleAsc);
          } else if (listSort === "title-desc") {
            const listByTitleDesc = sortItemsByTitleDesc(response);
            setUserTodoList(listByTitleDesc);
          } else {
            setAppErr(new Error("Invalid list sort-by value. Contact admin."));
          }
        } catch (error) {
          setAppErr(error);
        }
      }
      loadUserList();
      console.log(activeUser);
      console.log(userTodoList);
      return () => abortController.abort();
    } else {
      hasAccessToken ? setHasAccessToken(false) : setActiveUser({});
      const authSyncError = new Error(
        "Session authentication error. Please login again."
      );
      setAppErr(authSyncError);
      navigate("/enter");
    }
  }, [activeUser, hasAccessToken, userTodoList]);

  return (
    <>
      <Container fluid className="py-2">
        <Row className="text-center">
          <h1>TodoList</h1>
        </Row>
        <Row>{todoList}</Row>
      </Container>
    </>
  );
}

export default TodoList;
