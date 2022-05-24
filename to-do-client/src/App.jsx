import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Layout from "./layout/Layout";
import Home from "./home/Home";
import NotFound from "./NotFound";

function App() {
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [userToDoList, setUserToDoList] = useState([]);

  return (
    <Container fluid className="App justify-content-center m-0">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home activeUser={activeUser} setActiveUser={setActiveUser} />} />
          <Route path="home" element={<Home activeUser={activeUser} setActiveUser={setActiveUser} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
