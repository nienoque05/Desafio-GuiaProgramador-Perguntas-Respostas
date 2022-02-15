const Sequelize = require("sequelize"); //importanto sequilize
const connection = require("./database"); // importanto conexão coom o banco de dados

//criando a tabela perguntas
const Pergunta = connection.define('pergunta',{
    //definindo os tipos de dados
    titulo:{
        type: Sequelize.STRING,
        allowNull: false // impede o banco de receber informação nula
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(() =>{});
module.exports = Pergunta;
