const express = require('express');
const router = express.Router();
const OauthController = require('../controllers/oauthcontroller');
const OAuthServer = require('express-oauth-server');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const tasksRoutes = require('./routes/routes');

router.oauth = new OAuthServer({
    model: OauthController
});



app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors("*"));





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

router.post('/oauth/token', router.oauth.token());

//ruta para guardar los nuevos datos del cliente.
router.post('/oauth/set_client', function (req, res, next) {
    OauthController.setClient(req.body)
        .then((client) => res.json(client))
        .catch((error) => {
            return next(error);
        });
});

//ruta para guardar los datos de un nuevo usuario.
router.post('/oauth/signup', function (req, res, next) {
    OauthController.setUser(req.body)
        .then((user) => res.json(user))
        .catch((error) => {
            return next(error);
        });
});

//ruta para un punto final seguro
router.get('/secret', router.oauth.authenticate(), function (req, res) {
    res.json('Secret area');
});