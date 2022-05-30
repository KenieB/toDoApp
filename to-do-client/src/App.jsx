import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Layout from "./layout/Layout";
import Home from "./home/Home";
import NotFound from "./NotFound";
import EnterApp from "./home/EnterApp";

function App() {
  const [newUserFlag, setNewUserFlag] = useState(false);
  const [activeUser, setActiveUser] = useState({});
  const [hasAccessToken, setHasAccessToken] = useState(false);
  const [userTodoList, setUserTodoList] = useState([]);
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
                setHasAccessToken={setHasAccessToken}
                newUserFlag={newUserFlag}
                setNewUserFlag={setNewUserFlag}
                appErr={appErr}
                setAppErr={setAppErr}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
