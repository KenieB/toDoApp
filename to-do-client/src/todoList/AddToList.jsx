import React from "react";
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
  return (
    <>
      <Container fluid>
        <h1>AddToList</h1>
      </Container>
    </>
  );
}

export default AddToList;
