var database = require("../database/config")

function buscarValores(){

    var instrucaoSql = `SELECT 
            SUM(v.quantidade) AS totalPacotesVendidos,
            SUM(v.quantidade * p.preco) AS valorTotalGerado
        FROM 
            vendas v
        JOIN 
            pacote p ON v.idPacote = p.idPacote
        WHERE 
            v.dataVenda >= CURDATE() - INTERVAL 30 DAY;`;
  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

  function cadastrarCliente(nome, email, cpf, dtNasc, telefone, endereco, fkUsuario){

    var instrucaoSql = `INSERT INTO cliente (nome, cpf, telefone, email, cidade, Dtnascimento, FkEmpresaCliente) VALUES ('${nome}', '${cpf}', '${telefone}', '${email}', '${endereco}', '${dtNasc}', ${fkUsuario})`;
  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

  function buscarClientes(fkEmpresa){

    var instrucaoSql = `SELECT * FROM cliente WHERE FkEmpresaCliente = ${fkEmpresa};`;
  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

  function apagarCliente(clienteId){

    console.log("Id do cliente: " + clienteId)
    
    var instrucaoSql = `DELETE FROM cliente WHERE idCliente = ${clienteId};`;
  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

  function pesquisarClientes(nome){

    if(nome == "" || nome == null){

      var instrucaoSql = `SELECT * FROM cliente;`;

    }
    else{

      var instrucaoSql = `SELECT * FROM cliente WHERE nome LIKE '%${nome}%';`;
      
    }

  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

  function atualizarCliente(id, email, telefone, endereco){

    var instrucaoSql = `UPDATE cliente SET email = '${email}', telefone = '${telefone}', cidade = '${endereco}' WHERE idCliente = ${id};`;
  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

  function buscarConsultores(fkEmpresa){

    var instrucaoSql = `SELECT * FROM usuario WHERE FkEmpresa = ${fkEmpresa};`;
  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

  function apagarConsultor(consultorId){

    console.log("Id do cliente: " + consultorId);
    
    var instrucaoSql = `DELETE FROM usuario WHERE idUsuario = ${consultorId};`;
  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

  function cadastrarConsultor(nome, email, cpf, senha, cargo, empresa, superior){

    var instrucaoSql = `INSERT INTO usuario (nome, cpf, cargo, email, senha, FkEmpresa, superior) VALUES ('${nome}', '${cpf}', '${cargo}', '${email}', SHA2('${senha}', 256), '${empresa}', ${superior})`;
  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

  function pesquisarConsultor(nome){

      var instrucaoSql = `SELECT * FROM usuario WHERE nome LIKE '%${nome}%';`;
  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
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
    pesquisarConsultor
};