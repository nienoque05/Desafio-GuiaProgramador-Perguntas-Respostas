const Sequelize = require("sequelize"); //importanto sequilize
const connection = require("./database"); // importanto conexão coom o banco de dados

const Resposta = connection.define('respostas', {
    corpo:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId:{
        type: Sequelize.INTEGER,
        allowNull: false

    }
});
Resposta.sync({force: false});

module.exports = Resposta;