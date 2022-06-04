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
  InputGroup,
  Form,
} from "react-bootstrap";
import ErrorAlert from "../utils/ErrorAlert";
import { sortItemsByTitleAsc, sortItemsByTitleDesc } from "./sortListItems";
import { IoTrashBin, IoCalendarClear } from "react-icons/io5";
import { BsPlusSquareDotted, BsFillCalendarFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import formatAllDueDates from "../utils/formatDueDate";
//import { loadList, addNewTag, deleteListItem } from "../utils/api";
import "./TodoList.css";

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
  
  const mockUserTodoList = [
    {
      td_item_id: 37,
      user_id: 11,
      title: "accumsan tortor quis turpis sed",
      description:
        "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
      "due-date": "2021-07-06T04:00:00.000Z",
      tags: ["Mock Tag 4", "Mock Tag 3"],
      created_at: "2022-06-02T16:00:42.962Z",
      updated_at: "2022-06-02T16:00:42.962Z",
    },
    {
      td_item_id: 22,
      user_id: 11,
      title: "dictumst aliquam augue quam sollicitudin vitae consectetuer eget",
      description:
        "Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna.",
      "due-date": "2021-09-07T04:00:00.000Z",
      tags: ["Mock Tag 4", "Mock Tag 5"],
      created_at: "2022-06-02T16:00:42.962Z",
      updated_at: "2022-06-02T16:00:42.962Z",
    },
    {
      td_item_id: 15,
      user_id: 11,
      title: "vel nulla eget eros",
      description: "Ut at dolor quis odio consequat varius.",
      "due-date": "2021-09-13T04:00:00.000Z",
      tags: ["Mock Tag 2", "Mock Tag 5", "Mock Tag 3"],
      created_at: "2022-06-02T16:00:42.962Z",
      updated_at: "2022-06-02T16:00:42.962Z",
    },
    {
      td_item_id: 40,
      user_id: 11,
      title: "augue luctus tincidunt nulla mollis molestie lorem quisque",
      description: "Etiam justo. Etiam pretium iaculis justo.",
      "due-date": "2022-01-01T05:00:00.000Z",
      tags: ["Mock Tag 2"],
      created_at: "2022-06-02T16:00:42.962Z",
      updated_at: "2022-06-02T16:00:42.962Z",
    },
    {
      td_item_id: 28,
      user_id: 11,
      title: "sed sagittis nam congue risus semper porta volutpat",
      description:
        "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.",
      "due-date": "2022-06-13T04:00:00.000Z",
      tags: ["Mock Tag 5", "Mock Tag 3", "Mock Tag 2"],
      created_at: "2022-06-02T16:00:42.962Z",
      updated_at: "2022-06-02T16:00:42.962Z",
    },
    {
      td_item_id: 18,
      user_id: 11,
      title: "curabitur convallis duis consequat dui nec nisi volutpat",
      description: "Nunc purus.",
      "due-date": "2022-06-19T04:00:00.000Z",
      tags: ["Mock Tag 1"],
      created_at: "2022-06-02T16:00:42.962Z",
      updated_at: "2022-06-02T16:00:42.962Z",
    },
    {
      td_item_id: 7,
      user_id: 11,
      title: "nisl venenatis lacinia aenean sit amet",
      description:
        "Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy.",
      "due-date": "2022-06-25T04:00:00.000Z",
      tags: ["Mock Tag 4", "Mock Tag 5", "Mock Tag 3"],
      created_at: "2022-06-02T16:00:42.962Z",
      updated_at: "2022-06-02T16:00:42.962Z",
    },
  ];

  const mockTdListF = formatAllDueDates(mockUserTodoList);

  //const todoList = userTodoList.map((user_td_item) => (
  //const todoList = mockTdListF.map((user_td_item) => (
    const todoList = userTodoList.map((user_td_item) => (
    <Container fluid className="px-0">
      <Row className="border-bottom">
        <Col className="px-0">
          <Card key={user_td_item.td_item_id} className="border-0">
            <Row>
              <Col xs={12} lg={9} className="pe-0">
                <Card.Body>
                  <Card.Title>{`${user_td_item.title}`}</Card.Title>
                  <Card.Text>{`${user_td_item.description}`}</Card.Text>
                </Card.Body>
              </Col>
              <Col xs={12} lg={3} className="ps-0">
                <Container fluid className="d-flex flex-lg-column text-center justify-content-center align-content-around h-100 py-3">
                  <Card.Subtitle
                    id="list-item-date-main"
                  >{` ${user_td_item["due-date"].month_text} ${user_td_item["due-date"].day},`}</Card.Subtitle>
                  <Card.Text id="list-item-date-sub" className="d-lg-none">&#160;</Card.Text>
                  <Card.Text id="list-item-date-sub">{`${user_td_item["due-date"].year}`}</Card.Text>
                </Container>
              </Col>
            </Row>
            <Row className="g-0">
              <Col xs={12} lg={9} className="pe-lg-0 flex-fill">
                <Card.Footer
                  className="text-center fw-light fst-italic h-100"
                  style={{ fontVariantCaps: "all-small-caps" }}
                >
                  <InputGroup className="w-100 h-100">
                    <InputGroup.Text
                      style={{ width: "13.5%", marginRight: "1.5%", fontSize: "0.8rem" }} className="fw-bold text-secondary text-center px-0 justify-content-center"
                    >
                      {"Tags:"}
                    </InputGroup.Text>
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={`${user_td_item.tags.join(", ")}`}
                      style={{ width: "75%", fontVariant: "small-caps", overflow: "hidden", textOverflow: "ellipsis" }}
                      className="fst-italic text-muted"
                    />
                    <Button variant="secondary" style={{ width: "10%" }} className="text-light px-0">
                      <IconContext.Provider
                        value={{ size: "1.3em", title: "add-list-item-tag" }}
                      >
                        <BsPlusSquareDotted />
                      </IconContext.Provider>
                    </Button>
                  </InputGroup>
                </Card.Footer>
              </Col>
              <Col xs={12} lg={3} className="ps-lg-0">
                <Card.Footer>
                  <Container fluid className="d-flex justify-content-center px-0">
                    <Button variant="danger" className="w-100">
                      <IconContext.Provider
                        value={{ size: "2em", title: "delete-list-item" }}
                      >
                        <IoTrashBin />
                      </IconContext.Provider>
                    </Button>
                  </Container>
                </Card.Footer>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  ));

  /*useEffect(() => {
    mockUserTodoList.forEach((itm) => {
      console.log(
        `  itm #${itm.td_item_id} due-date type = ${typeof itm["due-date"]}`
      );
      const itmDueAsDate = new Date(itm["due-date"]);
      console.log(
        `    itm #${
          itm.td_item_id
        } Date(due-date) type = ${typeof itmDueAsDate}`
      );
      console.log(
        `    itm #${itm.td_item_id} Date(due-date) = ${itmDueAsDate}`
      );

      const fmtItmDueDateUtil = formatDueDate(itm);
      console.log(
        `      itm #${
          itm.td_item_id
        } Date(due-date) from UTIL = \n${Object.entries(
          fmtItmDueDateUtil["due-date"]
        )}`
      );
      console.log(
        `      itm #${
          itm.td_item_id
        } Date(due-date) from UTIL type = ${typeof fmtItmDueDateUtil[
          "due-date"
        ]}`
      );

      console.log(
        "-----------------------------------------------------------------------------------"
      );
    });
  }, []);*/
  return (
    <>
      <Container fluid className="py-5 px-0">
        <Row>
          <Col className="border border-3 border-secondary rounded-3">
            <CardGroup>{todoList}</CardGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TodoList;
