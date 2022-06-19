const { request } = require("express")
const pool = require('../db')

///Traer todas las tareas 
const getAllTasks = async (req, res, next) => {
   try {
        //throw new Error('Algo fue Mal')

        const tareas = await pool.query('SELECT * FROM tasks')

        res.json((tareas).rows)
   } catch (error) {
    next(error);
   }
}

///Funcion para traer una tarea
const getSingleTask = async (req, res, next) => {

    ///Sacar el parametro dado
    const {id} = req.params

    try {
        //Espera el resultado de la query y lo guarda
        const tarea = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);


        ///Si no trae rows
        if(tarea.rows.length === 0 ){
            return res.status(404).json({
                message: "Task not found",
            });
        }

        ///Regresa la row de la tarea en json
        res.json((tarea).rows)
   } catch (error) {
    next(error);
   }
}


const createTask = async (req, res, next) => {
    const { title, description } = req.body

    try {
        const result = await pool.query('INSERT INTO tasks (title, description) values ($1, $2) returning *', [ title, 
            description ]);
        
            
            res.json(result.rows[0]);
    } catch (error) {
        next(error);
        res.json({error: error.message});
        console.log({error: error.message});
    }
}

const deleteTask = async (req, res, next) => {

    const {id} = req.params;

    
    try {
        const tareaEliminada = await pool.query('Delete from tasks where id = $1 returning *', [id]);
        
        if (tareaEliminada.rowCount === 0){
            return res.status(404).json({
                message: "Task no found",
            });

        }
        res.json((tareaEliminada).rows);
        res.send("Deleting a task");
    } catch (error) {
        next(error);
    }
}

//Fuincion para actualizar se llega por la peticion PUT 
const updateTask = async (req, res, next) => {
    ///Saca los parametros del req osea de la url
    const {id} = req.params;

    ///Saca los parametros que se pasaron por el body en el JSON
    const {title, description} = req.body;
    try {
        ///Instruccion de BD se guarda el resultado en una constante
        const tareaupdateada = await pool.query('UPDATE tasks set title = $2, description= $3 where id = $1 returning *',[id,title,description] );
        ///Si retorna 0 rows entonces no encontro la tarea que se le paso
        if (tareaupdateada.rowCount === 0){
            ///Retorna un status 404 con un mensaje
            return res.status(404).json({
                message: "Task no found",
            });

        }
        ///Retorna las rows en un json 
        res.json((tareaupdateada).rows);
        res.send("Deleting a task");
    } catch (error) {
        ///Midleware de errores, este se define en el index.js
        next(error);
    }
}

///Exporta las funciones
module.exports = {
    getAllTasks,
    getSingleTask,
    createTask,
    deleteTask,
    updateTask
}
