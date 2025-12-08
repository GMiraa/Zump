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
    var endereco = req.body.endUsuario;
    var fkUsuario = req.body.fkCliente;
    
        dashboardModel.cadastrarCliente(nome, email, cpf, dtNasc, telefone, endereco, fkUsuario)
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

    function buscarClientes(req, res) {

    var fkEmpresa = req.params.fkempresa;

    dashboardModel.buscarClientes(fkEmpresa)
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

function apagarCliente(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var id = req.body.Id;
    
        dashboardModel.apagarCliente(id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao excluir o cliente Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                } 
            );
    }

function pesquisarClientes(req, res) {

    var nome = req.params.nomeCliente;

    dashboardModel.pesquisarClientes(nome)
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

function atualizarCliente(req, res) {

    var id = req.body.idCliente;
    var email = req.body.emailCliente;
    var telefone = req.body.telefoneCliente;
    var endereco = req.body.cidadeCliente;
    
        dashboardModel.atualizarCliente(id, email, telefone, endereco)
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

function buscarConsultores(req, res) {

    var fkEmpresa = req.params.fkempresa;

    dashboardModel.buscarConsultores(fkEmpresa)
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

function apagarConsultor(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var id = req.body.Id;
    
        dashboardModel.apagarConsultor(id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao excluir o consultor Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                } 
            );
    }

    function cadastrarConsultor(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.ConsultorNome;
    var email = req.body.ConsultorEmail;
    var cpf = req.body.ConsultorCPF;
    var senha = req.body.ConsultorSenha;
    var cargo = req.body.ConsultorCargo;
    var empresa = req.body.ConsultorEmpresa;
    var superior = req.body.ConsultorSuperior
    
        dashboardModel.cadastrarConsultor(nome, email, cpf, senha, cargo, empresa, superior)
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

    function pesquisarConsultor(req, res) {

    var nome = req.params.nomeConsultor;

    dashboardModel.pesquisarConsultor(nome)
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

function bloquearConsultor(req, res) {

    var id = req.params.id;

    dashboardModel.bloquearConsultor(id)
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

function desbloquearConsultor(req, res) {

    var id = req.params.id;

    dashboardModel.desbloquearConsultor(id)
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

function buscarKPIs(req, res) {

    var idUsuario = req.params.id;

    Promise.all([
        dashboardModel.buscarTotalFaturado(idUsuario),
        dashboardModel.buscarTotalVendas(idUsuario),
        dashboardModel.buscarPacoteMaisVendido(idUsuario)
    ]).then(resultados => {
        
        var fat = resultados[0];
        var vendas = resultados[1];
        var pacote = resultados[2];

        res.json({
            faturamento: fat,
            metricasVendas: vendas,
            PacoteMaisVendido: pacote
        });
    }).catch(erro => {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarInfosConsultores(req, res) {

    var fkEmpresa = req.params.fkempresa;

    dashboardModel.buscarInfosConsultores(fkEmpresa)
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

function buscarKPICliente(req, res) {

    var Id = req.params.idCliente;

    dashboardModel.buscarKPICliente(Id)
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

function buscarVendasPorMes(req, res) {

    var Id = req.params.id;

    dashboardModel.buscarVendasPorMes(Id)
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

function getConsultores(req, res) {

    var FkEmpresa = req.params.fkempresa;

    dashboardModel.getConsultores(FkEmpresa)
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

function buscarDadosGrafico(req, res) {

    var FkEmpresa = req.params.fkempresa;

    dashboardModel.buscarDadosGrafico(FkEmpresa)
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

module.exports = {
    buscarValores,
    cadastrarCliente,
    buscarClientes,
    apagarCliente,
    pesquisarClientes,
    atualizarCliente,
    buscarConsultores,
    apagarConsultor,
    cadastrarConsultor,
    pesquisarConsultor,
    bloquearConsultor,
    desbloquearConsultor,
    buscarKPIs,
    buscarInfosConsultores,
    buscarKPICliente,
    buscarVendasPorMes,
    getConsultores,
    buscarDadosGrafico
}