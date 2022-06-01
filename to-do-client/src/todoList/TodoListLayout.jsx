import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Container, Row, Col, CardGroup } from "react-bootstrap";
import ErrorAlert from "../layout/ErrorAlert";
import { loadList } from "../utils/api";

function TodoListLayout({
  activeUser,
  setActiveUser,
  hasAccessToken,
  setHasAccessToken,
  userTodoList,
  setUserTodoList,
  listSort,
  setListSort,
  appErr,
  setAppErr,
}) {
  const navigate = useNavigate();

  // listSort acceptableValues { field: ["title", "due-date"], direction: ["asc", "desc"] }

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
  useEffect(() => {
    setAppErr(null);
    const abortController = new AbortController();
    if (hasAccessToken && Object.keys(activeUser).length) {
      console.log("api.listTodoForUser");
      async function loadUserList() {
        try {
          const response = await loadList(
            activeUser.user_id,
            abortController.signal
          );
          console.log(response);
          setUserTodoList(response);
        } catch (error) {
          setAppErr(error);
        } finally {
          navigate("/todo/list");
        }
      }
      loadUserList();
      return () => abortController.abort();
    } else {
      hasAccessToken ? setHasAccessToken(false) : setActiveUser({});
      const authSyncError = new Error(
        "Session authentication error. Please login again."
      );
      setAppErr(authSyncError);
      navigate("/access/login");
    }
  }, [activeUser, hasAccessToken]);

  return (
    <>
      <Row id="list-header-row" className="mt-4">
        <Col id="list-header-col">
          <h1
            className="display-6 text-center"
            id="list-header"
            style={{ fontVariant: "small-caps" }}
          >
            {activeUser.name}'s To-Do List
          </h1>
        </Col>
      </Row>
      <Row className="my-2">
        <Col>
          <Container fluid>
            <ErrorAlert error={appErr} />
          </Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container fluid>
            <CardGroup>
              <Outlet />
            </CardGroup>
          </Container>
        </Col>
      </Row>
    </>
  );
}

export default TodoListLayout;
