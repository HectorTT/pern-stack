import { useEffect, useState } from 'react'
import { Button, Card, CardContent, Typography } from '@mui/material'
import { display, padding } from '@mui/system';
import {Navigate, useNavigate} from 'react-router-dom'





export default function ListTasks() {

    const [tasks, setTasks] = useState([]);
    const navegate = useNavigate()

    const loadtask = async () => {
        const res = await fetch('http://localhost:3000/tasks')
        const data = await res.json();
        console.log(data);
        setTasks(data);
    }

    const handleDelete = async (id) => {
        const res = await fetch(`http://localhost:3000/tasks/${id}`,{
            method: "Delete",
        });
        const data = await res.json();
        console.log(data);
        setTasks(tasks.filter(task => task.id !== id));
        
    }

    const handleUpdate = async (id) =>{
        const res = await fetch(`http://localhost:3000/tasks/${id}`,{
            method: "PUT",
        });

        const data = await res.json();
        console.log(data);

    } 

    useEffect(() => {
        loadtask();
    }, [])

    return (
        <>
            <h1>Task List</h1>
            {
                tasks.map(task => (
                    <Card style={{ marginBottom: "1rem" }} key={task.id}>

                        <CardContent style={{display:"flex", justifyContent:"space-between",}}>
                            <div>
                            <Typography>{task.title}</Typography>
                            <Typography>{task.description}</Typography>
                            </div>

                            <div>
                            <Button variant='contained' color='inherit' onClick={() => navegate(`/task/${task.id}/edit`)} style={{marginLeft:"1rem",}}>
                                Edit
                            </Button>
                            <Button  variant='contained' color='warning' onClick={() => handleDelete(task.id)}>
                                Delete
                            </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))
            }
        </>
    )
}
