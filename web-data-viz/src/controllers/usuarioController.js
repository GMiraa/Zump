var usuarioModel = require("../models/usuarioModel");

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeUsuario;
    var email = req.body.emailUsuario;
    var senha = req.body.senhaUsuario;
    var tipo = req.body.tipoUsuario;
    
        usuarioModel.cadastrar(nome, email, senha, tipo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                } 
            );
    }


function autenticar(req, res) {
    
    var email = req.body.emailUsuario;
    var senha = req.body.senhaUsuario;

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o login! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                } 
            );
}

module.exports = {
    cadastrar,
    autenticar
}