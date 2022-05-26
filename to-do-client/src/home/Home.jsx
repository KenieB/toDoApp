import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Home.css";
import UserAccess from "../userAccess/UserAccess";
//import { listStudents } from "../utils/api";
//import StudentsList from "./StudentsList";

function Home({ activeUser, setActiveUser, newUserFlag, setNewUserFlag }) {
  /*useEffect(() => {
    const abortController = new AbortController();
    async function loadStudents() {
      try {
        const response = await listStudents(abortController.signal);
        setStudents(response.students);
      } catch (error) {
        setStudentsError(error);
      }
    }
    loadStudents();
    return () => abortController.abort();
  }, [students, studentsError]);*/

  if (activeUser) {
    return (
      <>
        <Row id="app-header-row">
          <Col id="app-header-col">
            <h1
              id="app-header"
              className="display-1 text-center"
              style={{ fontVariant: "small-caps" }}
            >
              {activeUser.first_name}'s To-Do List
            </h1>
            <hr className="border rounded-2" style={{ height: "0.5em" }} />
          </Col>
        </Row>
        <Container
          id="app-content-container"
          fluid
          className="d-flex h-75 px-0 pb-5 justify-content-center"
        >
          <Row
            id="app-content-container-row"
            className="justify-content-center align-content-center gap-3 gap-md-4 gap-lg-5"
          >
            <h1>UserToDoList-jsx Here</h1>
          </Row>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Row id="app-header-row">
          <Col id="app-header-col">
            <h1
              id="app-header"
              className="display-1 text-center"
              style={{ fontVariant: "small-caps" }}
            >
              My To-Do List
            </h1>
            <hr className="border rounded-2" style={{ height: "0.5em" }} />
          </Col>
        </Row>
        <Container
          id="app-content-container"
          fluid
          className="d-flex h-75 px-0 pb-5 justify-content-center"
        >
          <Row
            id="app-content-container-row"
            className="justify-content-center align-content-center gap-3 gap-md-4 gap-lg-5"
          >
            <UserAccess setActiveUser={setActiveUser} newUserFlag={newUserFlag} setNewUserFlag={setNewUserFlag} />
          </Row>
        </Container>
      </>
    );
  }
}

export default Home;
