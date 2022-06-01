import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Layout from "./layout/Layout";
import Home from "./home/Home";
import NotFound from "./NotFound";
import EnterApp from "./home/EnterApp";
import UserAccessLayout from "./userAccess/UserAccessLayout";
import LoginUser from "./userAccess/LoginUser";
import RegisterUser from "./userAccess/RegisterUser";
import TodoListLayout from "./todoList/TodoListLayout";
import TodoList from "./todoList/TodoList";

function App() {
  const [newUserFlag, setNewUserFlag] = useState(false);
  const [activeUser, setActiveUser] = useState({});
  const [hasAccessToken, setHasAccessToken] = useState(false);
  const [userTodoList, setUserTodoList] = useState([]);
  const [listSort, setListSort] = useState({
    field: "due-date",
    direction: "asc",
  });
  // listSort acceptableValues { field: ["title", "due-date"], direction: ["asc", "desc"] }
  const [appErr, setAppErr] = useState(null);

  return (
    <Container
      fluid
      className="App justify-content-center m-0"
      id="root-app-container"
    >
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route
            path="enter"
            element={
              <EnterApp
                activeUser={activeUser}
                setActiveUser={setActiveUser}
                hasAccessToken={hasAccessToken}
                setNewUserFlag={setNewUserFlag}
                appErr={appErr}
                setAppErr={setAppErr}
              />
            }
          />
          <Route
            path="access"
            element={
              <UserAccessLayout
                activeUser={activeUser}
                setActiveUser={setActiveUser}
                hasAccessToken={hasAccessToken}
                setHasAccessToken={setHasAccessToken}
                newUserFlag={newUserFlag}
                setNewUserFlag={setNewUserFlag}
                appErr={appErr}
                setAppErr={setAppErr}
              />
            }
          >
            <Route
              path="login"
              element={
                <LoginUser
                  activeUser={activeUser}
                  setActiveUser={setActiveUser}
                  hasAccessToken={hasAccessToken}
                  setHasAccessToken={setHasAccessToken}
                  appErr={appErr}
                  setAppErr={setAppErr}
                  newUserFlag={newUserFlag}
                  setNewUserFlag={setNewUserFlag}
                />
              }
            />
            <Route
              path="register"
              element={
                <RegisterUser
                  activeUser={activeUser}
                  setActiveUser={setActiveUser}
                  hasAccessToken={hasAccessToken}
                  setHasAccessToken={setHasAccessToken}
                  appErr={appErr}
                  setAppErr={setAppErr}
                  newUserFlag={newUserFlag}
                  setNewUserFlag={setNewUserFlag}
                />
              }
            />
          </Route>
          <Route
            path="todo"
            element={
              <TodoListLayout
                activeUser={activeUser}
                setActiveUser={setActiveUser}
                hasAccessToken={hasAccessToken}
                setHasAccessToken={setHasAccessToken}
                userTodoList={userTodoList}
                setUserTodoList={setUserTodoList}
                listSort={listSort}
                setListSort={setListSort}
                appErr={appErr}
                setAppErr={setAppErr}
              />
            }
          >
            <Route
              path="list"
              element={
                <TodoList
                  activeUser={activeUser}
                  setActiveUser={setActiveUser}
                  hasAccessToken={hasAccessToken}
                  setHasAccessToken={setHasAccessToken}
                  userTodoList={userTodoList}
                  setUserTodoList={setUserTodoList}
                  listSort={listSort}
                  setListSort={setListSort}
                  appErr={appErr}
                  setAppErr={setAppErr}
                />
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
