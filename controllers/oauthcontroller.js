const bcrypt = require('bcrypt-nodejs');
const OAuthTokensModel = require('../models').OAuthTokens;
const OAuthClientsModel = require('../models').OAuthClients;
const OAuthUsersModel = require('../models').OAuthUsers;

//obtener el token de acceso del modelo de base de datos.
module.exports.getAccessToken = function (bearerToken) {
    return OAuthTokensModel.findOne(
        {
            where: {
                accessToken: bearerToken
            },
            include: [
                {
                    model: OAuthClientsModel,
                    as: 'client'
                },
                {
                    model: OAuthUsersModel,
                    as: 'user'
                }
            ]
        })
        .then((token) => {
            const data = new Object();
            for (const prop in token.get()) data[prop] = token[prop];
            data.client = data.client.get();
            data.user = data.user.get();
            return data;
        })
        .catch((error) => console.error(error));
};

//obtener los datos del cliente del modelo de base de datos
module.exports.getClient = function (clientId, clientSecret) {
    return OAuthClientsModel.findOne({where: {clientId: clientId, clientSecret: clientSecret}, raw: true});
};

//obtener el token de actualización del modelo de base de datos.
module.exports.getRefreshToken = function (refreshToken) {
    return OAuthTokensModel.findOne(
        {
            where: {
                refreshToken: refreshToken
            },
            include: [
                {
                    model: OAuthClientsModel,
                    as: 'client'
                },
                {
                    model: OAuthUsersModel,
                    as: 'user'
                }
            ]
        })
        .then((token) => {
            const data = new Object();
            for (const prop in token.get()) data[prop] = token[prop];
            data.client = data.client.get();
            data.user = data.user.get();
            console.log(data);
            return data;
        })
        .catch((error) => console.error(error));
};
//obtener el usuario del modelo de base de datos. Hay 2 pasos para consultar a un usuario, ]
//son por nombre de usuario y luego ejecutar Bcrypt compara la contraseña con la contraseña del usuario encontrado.
module.exports.getUser = function (username, password) {
    return OAuthUsersModel.findOne({where: {username: username}})
        .then((user) => {
            const isMatch = bcrypt.compareSync(password, user.get().password);
            if (isMatch) {
                return user.get();
            } else {
                console.error("Password not match");
            }
        });
};  


//guardar accessToken y refreshToken en el modelo de base de datos.
module.exports.saveToken = function (token, client, user) {
    return OAuthTokensModel
        .create(
            {
                accessToken: token.accessToken,
                accessTokenExpiresAt: token.accessTokenExpiresAt,
                clientId: client.id,
                refreshToken: token.refreshToken,
                refreshTokenExpiresAt: token.refreshTokenExpiresAt,
                userId: user.id
            }
        )
        .then((token) => {
            const data = new Object();
            for (const prop in token.get()) data[prop] = token[prop];
            data.client = data.clientId;
            data.user = data.userId;

            return data;
        })
        .catch((error) => console.error(error));
};

//anule el revokeToken que se usa para obtener el token de actualización.
module.exports.revokeToken = function (token) {
    console.log("Revoke token");
    return OAuthTokensModel
        .findOne({where: {refreshToken: token.refreshToken}})
        .then(refreshToken => {
            console.log(refreshToken);
            return refreshToken
                .destroy()
                .then(() => {
                    return !!refreshToken
                })
                .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
};
//A continuación, exporte las funciones adicionales que guardan los datos de un cliente y un usuario en la base de datos.
module.exports.setClient = function (client) {
    return OAuthClientsModel
        .create({
            clientId: client.clientId,
            clientSecret: client.clientSecret,
            redirectUris: client.redirectUris,
            grants: client.grants,
        })
        .then((client) => {
            client = client && typeof client == 'object' ? client.toJSON() : client;
            const data = new Object();
            for (const prop in client) data[prop] = client[prop];
            data.client = data.clientId;
            data.grants = data.grants;

            return data;
        })
        .catch((error) => console.error(error));
};
module.exports.setUser = function (user) {
    return OAuthUsersModel
        .create({
            username: user.username,
            password: user.password,
            name: user.name
        })
        .then((userResult) => {
            userResult = userResult && typeof userResult == 'object' ? userResult.toJSON() : userResult;
            const data = new Object();
            for (const prop in userResult) data[prop] = userResult[prop];
            data.username = data.username;
            data.name = data.name;

            return data;
        })
        .catch((error) => console.error(error));
};