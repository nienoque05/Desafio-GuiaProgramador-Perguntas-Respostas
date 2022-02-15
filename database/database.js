const Sequelize = require('sequelize'); // chamando a biblioteca sequelize
const connection = new Sequelize('guiaperguntas', 'root', 'bolsonaro2022',{
    host: 'localhost', 
    dialect: 'mysql'
});

module.exports = connection;