var express = require('express');
var route = express();
// import controller
const controller = require('./controller')
// create route
route.get('/index',controller.index);
route.get('/list',controller.list);
route.get('/create',controller.create);
route.get('/update',controller.update);
route.get('/get/:id',controller.get);
route.get('/delete/:id',controller.delete);

// exprot route
module.exports = route;