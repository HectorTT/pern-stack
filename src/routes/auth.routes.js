const express = require('express');
const router = express.Router();
const OauthController = require('../../controllers/oauthcontroller');
const OAuthServer = require('express-oauth-server');


router.oauth = new OAuthServer({
    model: OauthController
});




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

module.exports = router;