CREATE DATABASE zump1;

USE zump1;

show tables;

CREATE TABLE IF NOT EXISTS `cliente` (
  `idCliente` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `numero` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `cidade` VARCHAR(45) NOT NULL,
  `nascimento` VARCHAR(45) NOT NULL,
  `dtCriacao` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idCliente`)
);

CREATE TABLE IF NOT EXISTS `usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `cpf` varchar(45) NOT NULL,
  `cargo` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `superior` INT, 
  constraint fkSuperior foreign key (superior) references usuario(idUsuario), 
  PRIMARY KEY (`idUsuario`)
);

drop table usuario;

select * from usuario;

        SELECT idUsuario, nome, cargo, email FROM usuario WHERE email = 'guilherme@gmail.com' AND senha = 'gui22';


CREATE TABLE IF NOT EXISTS `acao` (
  `idAcao` INT NOT NULL,
  `descricao` VARCHAR(45) NOT NULL,
  `acao` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idAcao`)
);

CREATE TABLE IF NOT EXISTS `pacote` (
  `idPacote` INT auto_increment,
  `nome` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(45) NOT NULL,
  `qtd_dia` INT NOT NULL,
  `qtd_noite` INT NOT NULL,
  `preco` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`idPacote`)
);

insert into pacote values (default, "Maldivas", "blablabla", 7, 6, 10000);

CREATE TABLE IF NOT EXISTS `vendas` (
  idVenda INT PRIMARY KEY auto_increment,
  idPacote INT NOT NULL,
  dataVenda DATE NOT NULL,
  quantidade INT NOT NULL,
  FOREIGN KEY (idPacote) REFERENCES pacote(idPacote)
);

insert into vendas values (default, 1, '2025-10-26', 1);

SELECT 
    SUM(v.quantidade) AS totalPacotesVendidos,
    SUM(v.quantidade * p.preco) AS valorTotalGerado
FROM 
    vendas v
JOIN 
    pacote p ON v.idPacote = p.idPacote
WHERE 
    v.dataVenda >= CURDATE() - INTERVAL 30 DAY;

CREATE TABLE IF NOT EXISTS `logs` (
  `fk_acao` INT NOT NULL AUTO_INCREMENT,
  `fk_usuario` INT NOT NULL,
  `data` DATE NOT NULL,
  `descricao` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`fk_acao`, `fk_usuario`),
  INDEX `fk_acao_has_usuario_usuario1_idx` (`fk_usuario`),
  INDEX `fk_acao_has_usuario_acao_idx` (`fk_acao`),
  CONSTRAINT `fk_acao_has_usuario_acao`
    FOREIGN KEY (`fk_acao`)
    REFERENCES `acao` (`idAcao`),
  CONSTRAINT `fk_acao_has_usuario_usuario1`
    FOREIGN KEY (`fk_usuario`)
    REFERENCES `usuario` (`idUsuario`)
);

CREATE TABLE IF NOT EXISTS `avaliacao` (
  `pkPacote` INT NOT NULL,
  `pkCliente` INT NOT NULL,
  `idAvaliacao` INT NOT NULL AUTO_INCREMENT,
  `nota` INT NOT NULL,
  PRIMARY KEY (`idAvaliacao`),
  INDEX `fk_pacote_has_cliente_cliente1_idx` (`pkCliente`),
  INDEX `fk_pacote_has_cliente_pacote1_idx` (`pkPacote`),
  CONSTRAINT `fk_pacote_has_cliente_pacote1`
    FOREIGN KEY (`pkPacote`)
    REFERENCES `pacote` (`idPacote`),
  CONSTRAINT `fk_pacote_has_cliente_cliente1`
    FOREIGN KEY (`pkCliente`)
    REFERENCES `cliente` (`idCliente`)
);

CREATE TABLE IF NOT EXISTS `destino` (
  `idDestino` INT NOT NULL AUTO_INCREMENT,
  `pkPacote` INT NOT NULL,
  `uf` CHAR(2) NOT NULL,
  `municipio` VARCHAR(60) NOT NULL,
  `possui_aeroporto` TINYINT NOT NULL,
  `possui_guia` TINYINT NOT NULL,
  `qtd_guia` INT NOT NULL,
  `modais_acesso` VARCHAR(100) NOT NULL,
  `possui_conservacao` TINYINT NOT NULL,
  `possui_termais` TINYINT NOT NULL,
  `presenca_hidrica` VARCHAR(45) NOT NULL,
  `destinocol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idDestino`, `pkPacote`),
  INDEX `fk_destino_pacote1_idx` (`pkPacote`),
  CONSTRAINT `fk_destino_pacote1`
    FOREIGN KEY (`pkPacote`)
    REFERENCES `pacote` (`idPacote`)
);