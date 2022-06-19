const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors("*"));



const tasksRoutes = require('./routes/routes');


app.use(cors())
app.use(morgan('dev'))
app.use(express.json());
app.use(tasksRoutes);
//app.use('/', require('./routes/routes'));

//Database Connection
const db = require('./config/database');
db.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})


const PORT = process.env.PORT || 5000;
db.sync().then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
}).catch(err => console.log("Error: " + err));