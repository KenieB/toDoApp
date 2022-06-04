import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { GiExitDoor } from "react-icons/gi";
import { MdAddTask } from "react-icons/md";
import { IconContext } from "react-icons";
import { logoutUser, loadList } from "../utils/api";
import {
  sortItemsByTitleAsc,
  sortItemsByTitleDesc,
  sortItemsByDueDateAsc,
  sortItemsByDueDateDesc,
} from "./sortListItems";

function TodoListLayout({
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

  // listSort possible values: [ "due-date-asc", "due-date-desc", "title-asc", "title-desc" ]
  const handleSortByChange = ({ target }) => {
    setListSort(target.value);
    console.log(`previous listSort: ${listSort}`);
  };

  const handleListExit = (event) => {
    event.preventDefault();
    const result = window.confirm(
      "If you're done with your to-do list for now click 'OK' to logout and return to the home screen.\n\nAny changes have been saved automatically and will be available the next time you log in."
    );
    if (result) {
      async function logOut() {
        const abortController = new AbortController();
        try {
          const clearUserSession = await logoutUser(abortController.signal);
          setHasAccessToken(false);
          setActiveUser({});
          setUserTodoList([]);
          setListSort("due-date-asc");
          setAppErr(null);
          navigate("/");
        } catch (error) {
          setAppErr(error);
        }
      }
      logOut();
    }
  };

  useEffect(() => {
    if (!hasAccessToken || !Object.keys(activeUser).length) {
      setAppErr(new Error("Unauthorized user. Login for access."));
      navigate("/enter");
    }
  }, [hasAccessToken, activeUser, setAppErr]);

  useEffect(() => {
    setAppErr(null);
    const abortController = new AbortController();
    if (hasAccessToken && Object.keys(activeUser).length) {
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
      }
      loadUserList();
      console.log(userTodoList.entries());
      return () => abortController.abort();
    } else {
      hasAccessToken ? setHasAccessToken(false) : setActiveUser({});
      const authSyncError = new Error(
        "Session authentication error. Please login again."
      );
      setAppErr(authSyncError);
      navigate("/enter");
    }
  }, [setUserTodoList, setAppErr, listSort]);

  useEffect(() => {
    console.log(`new listSort: ${listSort}`);
    
  }, [listSort, setUserTodoList]);
  return (
    <>
      <Container
        id="td-list-layout-container"
        className="d-flex justify-content-center w-100 h-100 px-0 px-sm-auto"
      >
        <Row id="td-list-layout-row" className="w-100 flex-fill">
          <Col id="td-list-layout-col" className="d-flex">
            <Container
              fluid
              id="td-list-layout-content-container"
              className="py-4 px-0 px-sm-auto"
            >
              <Row id="td-list-content-header-row">
                <h1
                  id="td-list-content-header"
                  className="display-6 text-center"
                  style={{ fontVariant: "small-caps" }}
                >
                  {activeUser.name}'s To-Do List
                </h1>
              </Row>
              <hr style={{ height: "0.3rem" }} />
              <Row id="td-list-content-options-row">
                <Col
                  xs={{ span: 10, offset: 1 }}
                  lg={{ span: 2, offset: 0 }}
                  className=""
                >
                  <Container
                    id="td-list-options-btn-container-done"
                    className="d-flex justify-content-center h-100 px-3"
                  >
                    <Button
                      variant="secondary"
                      id="td-list-options-btn-done"
                      className="fs-4 fs-md-2 flex-fill"
                      style={{ fontVariant: "small-caps" }}
                      onClick={handleListExit}
                    >
                      <IconContext.Provider
                        value={{ size: "2em", title: "save-and-exit" }}
                      >
                        <GiExitDoor />
                      </IconContext.Provider>
                    </Button>
                  </Container>
                </Col>
                <Col
                  xs={{ span: 10, offset: 1 }}
                  lg={{ span: 6, offset: 1 }}
                  className="d-flex justify-content-center"
                >
                  <Container
                    id="td-list-options-container-sortby"
                    className="flex-fill"
                  >
                    <Form.Group controlId="sortBy">
                      <Form.Label style={{ fontVariantCaps: "all-small-caps" }}>
                        Sort by
                      </Form.Label>
                      <Form.Select
                        aria-label="Sort list by"
                        value={listSort}
                        onChange={handleSortByChange}
                        style={{ fontVariant: "small-caps" }}
                      >
                        <option value="due-date-asc">
                          Due Date, ascending
                        </option>
                        <option value="due-date-desc">
                          Due Date, descending
                        </option>
                        <option value="title-asc">Title, A to Z</option>
                        <option value="title-desc">Title, Z to A</option>
                      </Form.Select>
                    </Form.Group>
                  </Container>
                </Col>
                <Col
                  xs={{ span: 10, offset: 1 }}
                  lg={{ span: 2, offset: 1 }}
                  className=""
                >
                  <Container
                    id="td-list-options-btn-container-add-item"
                    className="d-flex justify-content-center w-100 h-100 py-1 px-4"
                  >
                    <Button
                      variant="success"
                      id="td-list-options-btn-add-item"
                      className="fs-4 fs-md-2 flex-fill"
                      style={{ fontVariant: "small-caps" }}
                      onClick={() => console.log("ADD ITEM BTN CLICKED")}
                    >
                      <IconContext.Provider
                        value={{ size: "2em", title: "add-new-task" }}
                      >
                        <MdAddTask />
                      </IconContext.Provider>
                    </Button>
                  </Container>
                </Col>
              </Row>
              <Row id="td-list-content-outlet-row">
                <Col id="td-list-content-outlet-col">
                  <Container fluid id="td-list-content-outlet-container">
                    <Outlet />
                  </Container>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default TodoListLayout;
