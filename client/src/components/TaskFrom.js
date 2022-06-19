/* Exportamos lo necesario */
import { useState, useEffect } from 'react';
import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

/* Componente formulario */
export default function TaskFrom() {

    /* Aqui se guardaran los valores del formulario */
    /* Guarda el estado de la app */
    /* Es lo que el Form puede ver */
    const [task, setTask] = useState({
        title: "",
        description: ""
    });
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();
    const params = useParams();

    /* Funcion que se ejecuta cuando se le da enviar */
    const handlerSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (editing) {
            const res = await fetch(`http://localhost:3000/tasks/${params.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(task),
            });
            const data = await res.json();
            console.log(data);

        } else {
            /* Mandar datos a la API con fetch  mediante POST*/
            const res = await fetch('http://localhost:3000/tasks', {
                method: "POST",
                /* Sin esto mandaba los valores null */
                /* Parece que hacia falta decirle que lo que le enviamos es un JSON */
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: (JSON.stringify(task)),
            });
            const data = await res.json();
            console.log(data);
        }

        setLoading(false);
        navigate('/');
    }
    /* Funcion que guarda los datos de los imputs en las variables */
    const handlerChange = e =>
        setTask({ ...task, [e.target.name]: e.target.value });

    const loadtasks = async (id) => {
        const res = await fetch(`http://localhost:3000/tasks/${id}`)
        const data = await res.json()
        console.log(data[0].title, data[0].description, data[0].id, data);
        setTask({ title: data[0].title, description: data[0].description });
        setEditing(true);
    }

    useEffect(() => {
        if (params.id) {
            loadtasks(params.id);
        }
    }, [params.id])
    /* Return del componente Form*/
    /* Retorna la vista*/
    return (
        <Grid container directions="colum" alignItems="center" justifyContent="center">
            <Grid item xs={3}>
                <Card sx={{ mt: 5 }} style={{ background: "#1e272e", padding: "1rem" }}>
                    <Typography color="#eee">
                      {editing ? "Edit Task" : "Create Task"}
                    </Typography>
                    <CardContent>
                        {/* El Form tiene la funcion de  handlerSubmit*/}
                        <form onSubmit={handlerSubmit}>
                            {/* Los onChange de los inputs se van a  handlerChange*/}
                            <TextField value={task.title} variant="filled" name="title" label="Title" sx={{ display: "block", margin: ".5rem 0", background: "#eee" }} onChange={handlerChange} />
                            <TextField value={task.description} variant="filled" multiline rows={4} name="description" sx={{ display: "block", margin: ".5rem 0", background: "#eee" }} label="Description" onChange={handlerChange}></TextField>
                            <Button variant="contained" sx={{ pading: "3rem " }} color='primary' disabled={!task.title || !task.description || loading} type="submit">
                                {loading ? <CircularProgress color='inherit' size={24} /> : "Save"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
