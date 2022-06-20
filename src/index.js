const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
//const cors = require('cors');
var cors = require("cors");
const app = express();
var cors = require('cors');


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors("*"));



const tasksRoutes = require('./routes/routes');


app.use(cors())
app.use(morgan('dev'))
app.use(express.json());
app.use(tasksRoutes);
//app.use('/', require('./routes/routes'));


const CLIENT_ID = "608d576676aabc0f9c23";
const CLIENT_SECRET = "fff984afa711f4073eb0ffb40c801f3cf80d8b7e";
const GITHUB_URL = "https://github.com/login/oauth/access_token";

//const app = express();
app.use(cors({ credentials: true, origin: true }));

app.get("/oauth/redirect", (req, res) => {
  axios({
    method: "POST",
    url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`,
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    res.redirect(
      `http://localhost:3001?access_token=${response.data.access_token}`
    );
  });
});

const PORTGIT = 5000;
app.listen(PORTGIT, () => {
  console.log(`Listening at port ${PORTGIT}`);
});
/* 
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
}).catch(err => console.log("Error: " + err)); */