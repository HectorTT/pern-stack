import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TaskList from './components/ListTasks'
import TaskFrom from './components/TaskFrom'
import { Container } from "@mui/material"
import Menu from './components/Navbar'

export default function App() {
  return (
    <BrowserRouter>
    <Menu/>
      <Container>
        <Routes>
          <Route path='/' element={<TaskList />} />
          <Route path='/task/new' element={<TaskFrom />} />
          <Route path='/task/:id/edit' element={<TaskFrom />}/>
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

