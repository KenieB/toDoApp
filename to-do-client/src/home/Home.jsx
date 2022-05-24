import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
//import { listStudents } from "../utils/api";
//import StudentsList from "./StudentsList";

function Home({ activeUser, setActiveUser }) {
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

  return (
    <>
      <Row>
        <Col xs={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
          <h1 className="display-1">HOME</h1>
        </Col>
      </Row>
    </>
  );
}

export default Home;
