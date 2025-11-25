var dashboardModel = require("../models/dashboardModel");

function buscarValores(req, res) {

    dashboardModel.buscarValores()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar a busca! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function cadastrarCliente(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeCliente;
    var email = req.body.emailCliente;
    var cpf = req.body.cpfCliente;
    var dtNasc = req.body.DataNascimento;
    var telefone = req.body.telefoneUsuario;
    var endereco = req.body.endUsuario
    
        dashboardModel.cadastrarCliente(nome, email, cpf, dtNasc, telefone, endereco)
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

module.exports = {
    buscarValores,
    cadastrarCliente
}