import React, { useState, useEffect } from "react";
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
  Modal,
} from "react-bootstrap";
import ErrorAlert from "../utils/ErrorAlert";
import { IoTrashBin, IoCalendarClear } from "react-icons/io5";
import { BsPlusSquareDotted, BsFillCalendarFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { loadList, addNewTag, deleteListItem } from "../utils/api";
import {
  sortItemsByTitleAsc,
  sortItemsByTitleDesc,
  sortItemsByDueDateDesc,
} from "./sortListItems";
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
  deleteItemFlag,
  setDeleteItemFlag,
  newTagFlag,
  setNewTagFlag,
}) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [newTagData, setNewTagData] = useState("");
  const [tagModalItmId, setTagModalItmId] = useState("");

  const handleClose = () => {
    setTagModalItmId("");
    setNewTagData("");
    setShow(false);
  };
  const handleShow = (event) => {
    const itmIdName = event.target.id;
    const parseItmId = itmIdName.substring(7);
    //console.log("handleShow event");
    //console.log(parseItmId);
    setTagModalItmId(parseItmId);
    setShow(true);
  };

  const handleNewTagFormChange = (event) => {
    setNewTagData(event.target.value);
    /*console.log(
      "--------------------------- newTagData handleNewTagFormChange ---------------------------"
    );
    console.log(`tagModalItmId: ${tagModalItmId}`);
    console.log(newTagData);
    console.log(
      "-----------------------------------------------------------------------------"
    );*/
  };

  const addTagClickHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    const dataForNewTag = {
      item_id: tagModalItmId,
      new_tag: newTagData.trim(),
    };

    /*console.log(
      "--------------------------- addTagClickHandler ---------------------------"
    );
    console.log(dataForNewTag);
    console.log(
      "--------------------------------------------------------------------------"
    );*/

    async function addTagToListItem() {
      try {
        const response = await addNewTag(
          activeUser.id,
          dataForNewTag,
          abortController.signal
        ).then(() => setShow(false));
        setNewTagFlag(true);
        navigate("/todo/list");
      } catch (error) {
        setAppErr(error);
      }
    }

    addTagToListItem();

    //setNewTagFlag(true);

    //setShow(false);

    return () => abortController.abort();
  };

  const deleteItemClickHandler = (event) => {
    event.preventDefault();
    //console.log(event.target.name.substring(4));
    const result = window.confirm(
      "Are you sure you want to delete this item?\n\nThis cannot be undone."
    );
    if (result) {
      const deleteItemName = event.target.name;
      const deleteItemId = deleteItemName.substring(4);
      const deleteItm = {
        item_id: deleteItemId,
      };
      async function deleteFromList() {
        const abortController = new AbortController();
        try {
          const deleteAndList = await deleteListItem(
            activeUser.id,
            deleteItm,
            abortController.signal
          );
          setDeleteItemFlag(true);
          navigate("/todo/list");
        } catch (error) {
          setAppErr(error);
        }
      }

      deleteFromList();

      return () => abortController.abort();
    }
  };

  const todoList = userTodoList.map((user_td_item) => (
    <Container
      fluid
      className="px-0"
      key={user_td_item.td_item_id}
      id={user_td_item.td_item_id}
    >
      <Container>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title id="add-tag-to-list-item-title">Add Tag</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              required
              type="text"
              placeholder="Enter new tag"
              onChange={handleNewTagFormChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={addTagClickHandler}>
              Save Tag
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

      <Row className="border-bottom">
        <Col className="px-0">
          <Card className="border-0">
            <Row>
              <Col xs={12} lg={9} className="pe-0">
                <Card.Body>
                  <Card.Title>{`${user_td_item.title}`}</Card.Title>
                  <Card.Text>{`${user_td_item.description}`}</Card.Text>
                </Card.Body>
              </Col>
              <Col xs={12} lg={3} className="ps-0">
                <Container
                  fluid
                  className="d-flex flex-lg-column text-center justify-content-center align-content-around h-100 py-3"
                >
                  <Card.Subtitle id="list-item-date-main">{` ${user_td_item["due-date"].month_text} ${user_td_item["due-date"].day},`}</Card.Subtitle>
                  <Card.Text id="list-item-date-sub" className="d-lg-none">
                    &#160;
                  </Card.Text>
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
                      style={{
                        width: "13.5%",
                        marginRight: "1.5%",
                        fontSize: "0.8rem",
                      }}
                      className="fw-bold text-secondary text-center px-0 justify-content-center"
                    >
                      {"Tags:"}
                    </InputGroup.Text>
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={`${user_td_item.tags.join(", ")}`}
                      style={{
                        width: "75%",
                        fontVariant: "small-caps",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      className="fst-italic text-muted"
                    />
                    <Button
                      variant="secondary"
                      style={{ width: "10%" }}
                      className="text-light px-0"
                      onClick={handleShow}
                      id={`addTag_${user_td_item.td_item_id}`}
                    >
                      <IconContext.Provider
                        value={{ size: "1.3em", title: "add-list-item-tag" }}
                      >
                        <BsPlusSquareDotted
                          id={`addTag_${user_td_item.td_item_id}`}
                        />
                      </IconContext.Provider>
                    </Button>
                  </InputGroup>
                </Card.Footer>
              </Col>
              <Col xs={12} lg={3} className="ps-lg-0">
                <Card.Footer>
                  <Container
                    fluid
                    className="d-flex justify-content-center px-0"
                  >
                    <Button
                      variant="danger"
                      className="w-100"
                      onClick={deleteItemClickHandler}
                      name={`del_${user_td_item.td_item_id}`}
                    >
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

    return () => abortController.abort();
  }

  /*useEffect(() => {
    if (newTagFlag) {
      console.log("newTagFlag useEffect");
      console.log(newTagFlag);
      setAppErr(null);

      loadUserList();
      console.log();
      //.then(() => navigate("/todo/list"));
      //navigate("/todo/list");
    }
  }, [newTagFlag]);*/
  return (
    <>
      <Container fluid className="py-5 px-0">
        <Row>
          <ErrorAlert error={appErr} />
        </Row>
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
