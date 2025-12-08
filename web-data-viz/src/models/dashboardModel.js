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

  function bloquearConsultor(id){

      var instrucaoSql = `UPDATE usuario SET bloqueado = true WHERE idUsuario = ${id}`;
  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

  function desbloquearConsultor(id){

      var instrucaoSql = `UPDATE usuario SET bloqueado = false WHERE idUsuario = ${id}`;
  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

function buscarTotalFaturado(idUsuario) {
    var instrucaoSql = `
        SELECT 
            COALESCE(SUM(v.quantidade * p.preco), 0) AS TotalFaturado
        FROM vendas v
        JOIN pacote p ON v.idPacote = p.idPacote
        WHERE v.idUsuario = ${idUsuario}
          AND MONTH(v.dataVenda) = MONTH(CURRENT_DATE())
          AND YEAR(v.dataVenda) = YEAR(CURRENT_DATE());
    `;
    return database.executar(instrucaoSql);
}

function buscarTotalVendas(idUsuario) {
    var instrucaoSql = `
        SELECT 
            COALESCE(SUM(v.quantidade), 0) AS TotalPacotesVendidos,
            COUNT(v.idVenda) AS TotalTransacoes
        FROM vendas v
        WHERE v.idUsuario = ${idUsuario};
    `;
    return database.executar(instrucaoSql);
}

function buscarPacoteMaisVendido(idUsuario) {
    var instrucaoSql = `
        SELECT 
            p.nome AS PacoteMaisVendido,
            SUM(v.quantidade) AS QuantidadeTotal
        FROM vendas v
        JOIN pacote p ON v.idPacote = p.idPacote
        WHERE v.idUsuario = ${idUsuario}
        GROUP BY p.idPacote, p.nome
        ORDER BY QuantidadeTotal DESC
        LIMIT 1;
    `;
    
    return database.executar(instrucaoSql)
        .then(function(resultado) {
            // Se o array estiver vazio (length 0), retorna o objeto padrão
            if (resultado.length === 0) {
                return [{ 
                    PacoteMaisVendido: "Nenhum", 
                    QuantidadeTotal: 0 
                }];
            }
            // Se encontrou algo, retorna o resultado normal do banco
            return resultado;
        });
}

function buscarInfosConsultores(fkEmpresa) {

    var instrucaoSql = `
        SELECT 
            COALESCE(SUM(CASE WHEN bloqueado = 1 THEN 1 ELSE 0 END), 0) AS qtd_bloqueados,
            
            COALESCE(SUM(CASE 
                WHEN MONTH(DtCriacao) = MONTH(CURRENT_DATE()) 
                AND YEAR(DtCriacao) = YEAR(CURRENT_DATE()) 
                THEN 1 ELSE 0 
            END), 0) AS novos_consultores_mes

        FROM usuario
        WHERE FkEmpresa = ${fkEmpresa};
    `;
    
    return database.executar(instrucaoSql);
}

function buscarKPICliente(Id){

  // Arrumar o select para trazer os dados certos

    var instrucaoSql = `
        SELECT 
            COALESCE(
                (SELECT SUM(quantidade) 
                 FROM vendas 
                 WHERE idCliente = ${Id}), 
            0) AS total_pacotes_fechados,

            COALESCE(
                (SELECT p.nome
                 FROM vendas v
                 JOIN pacote p ON v.idPacote = p.idPacote
                 WHERE v.idCliente = ${Id}
                 GROUP BY p.idPacote, p.nome
                 ORDER BY SUM(v.quantidade) DESC
                 LIMIT 1), 
            'Nenhum') AS pacote_mais_fechado;
    `;
    return database.executar(instrucaoSql);
}

function buscarVendasPorMes(Id) {
    var instrucaoSql = `
        SELECT 
            DATE_FORMAT(MAX(v.dataVenda), '%b/%Y') as mes,
            SUM(v.quantidade * p.preco) as valor_total
        FROM vendas v
        JOIN pacote p ON v.idPacote = p.idPacote
        WHERE v.idUsuario = ${Id}
          AND v.dataVenda >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
        GROUP BY YEAR(v.dataVenda), MONTH(v.dataVenda)
        ORDER BY YEAR(v.dataVenda), MONTH(v.dataVenda);
    `;
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
    pesquisarConsultor,
    bloquearConsultor,
    desbloquearConsultor,
    buscarTotalFaturado,
    buscarTotalVendas,
    buscarPacoteMaisVendido,
    buscarInfosConsultores,
    buscarKPICliente,
    buscarVendasPorMes
};