import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Layout from "./layout/Layout";
import Home from "./home/Home";
import NotFound from "./NotFound";

function App() {
  const [newUserFlag, setNewUserFlag] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [userToDoList, setUserToDoList] = useState([]);

  return (
    <Container fluid className="App justify-content-center m-0" id="root-app-container">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home activeUser={activeUser} setActiveUser={setActiveUser} newUserFlag={newUserFlag} setNewUserFlag={setNewUserFlag} />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
