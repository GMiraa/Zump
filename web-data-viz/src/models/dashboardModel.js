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

  function cadastrarCliente(nome, email, cpf, dtNasc, telefone, endereco){

    var instrucaoSql = `INSERT INTO cliente (nome, cpf, telefone, email, cidade, Dtnascimento) VALUES ('${nome}', '${cpf}', '${telefone}', '${email}', '${endereco}', '${dtNasc}')`;
  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

  function buscarCLientes(){

    var instrucaoSql = `INSERT INTO cliente (nome, cpf, telefone, email, cidade, Dtnascimento) VALUES ('${nome}', '${cpf}', '${telefone}', '${email}', '${endereco}', '${dtNasc}')`;
  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

module.exports = {
    buscarValores,
    cadastrarCliente,
    buscarCLientes
};