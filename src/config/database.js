var Sequelize = require('sequelize');

const database = new Sequelize(
  'tasks', // name database
  'postgres', // user database
  'toor', // password database
  {
    host: 'localhost',
    dialect: 'postgres' // mariadb / sqlite / postgres
  }
);

database.sync()

module.exports = database;