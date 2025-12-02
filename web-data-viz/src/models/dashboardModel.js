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

module.exports = {
    buscarValores,
    cadastrarCliente,
    buscarClientes,
    apagarCliente,
    pesquisarClientes
};