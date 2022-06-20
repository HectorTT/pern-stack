import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TaskList from './components/ListTasks'
import TaskFrom from './components/TaskFrom'
import Login from './components/Login'
import { Container } from "@mui/material"
import Menu from './components/Navbar'


import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get(
      "access_token"
    );

    axios
      .get("http://localhost:8010/proxy/user", {
        headers: {
          Authorization: "token " + token,
        },
      })
      .then((res) => {
        setUser(res.data);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  }, []);

  return (
    <BrowserRouter>
    <Menu/>
      <Container>
        <Routes>
          <Route path='/' element={loggedIn ? <TaskList /> : <Login/>} />
          <Route path='/task/new' element={<TaskFrom />} />
          <Route path='/task/:id/edit' element={<TaskFrom />}/>
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App;
