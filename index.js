const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");// importanto database
const Pergunta = require("./database/Pergunta"); //representa a taabela pergunta
const res = require("express/lib/response");
const Resposta = require("./database/Resposta");

//database
connection
.authenticate()
.then(()=>{

})

//dizendo ao Express usar o EJS como renderizador
app.set('view engine', 'ejs');
app.use(express.static('public'));// dizendo ao express que vai usar arquivo statico 
app.use(bodyParser.urlencoded({extended:false}));// codifica os dados enviados para o formulario
app.use(bodyParser.json());// ler dados de formulario atraves de uma API
app.get("/",(req, res) => {
    //responsavel por procurar as perguntass no banco de dados
    Pergunta.findAll({ raw: true, order:[
        ['id','DESC'] //definindo a ordem 
    ]}).then(perguntas =>{
        res.render("index",{
            perguntas: perguntas
        });

    });

 
     });
app.get("/perguntar", (req, res) =>{
    res.render("perguntar");
})
app.post("/salvarpergunta", (req, res)=>{
    var titulo = req.body.titulo; // pegando informações dos campos do formulario
    var descricao = req.body.descricao;


    // recebendo e inserindo dados das variaveis nos campos da tabela no banco de dados
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/");
    });
});
app.get("/pergunta/:id",(req ,res)=>{

    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{

        if(pergunta != undefined){ //pergunta encontrada

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
            
        }else{ // nao encontrada
            res.redirect("/");

        }
    })
})
app.post("/responder", (req, res) =>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=>{
        res.redirect("/pergunta/" + perguntaId);
    });

});
app.listen(8080, ()=>{
    console.log("app rodando")
});