CREATE DATABASE zump1;
drop database zump1;
USE zump1;

show tables;

select * from cliente;

insert into cliente values (default, "Paula", "(11)98675-1983", "paula@gmail.com", "São Paulo", "19/04/1989", default);

SELECT 
            SUM(v.quantidade) AS totalPacotesVendidos,
            SUM(v.quantidade * p.preco) AS valorTotalGerado
        FROM 
            vendas v
        JOIN 
            pacote p ON v.idPacote = p.idPacote
        WHERE 
            v.dataVenda >= CURDATE() - INTERVAL 365 DAY;

CREATE TABLE IF NOT EXISTS `empresa`(
`idEmpresa` INT NOT NULL AUTO_INCREMENT,
`nome` VARCHAR (45) NOT NULL,
`cnpj` VARCHAR(45) NOT NULL,
PRIMARY KEY (`idEmpresa`)
);

INSERT INTO empresa (nome, cnpj) VALUES 
('Zump Tech Solutions', '12.345.678/0001-01'),
('Inova Dados Ltda', '98.765.432/0001-99'),
('Tech Future Systems', '11.222.333/0001-55'),
('Code Masters', '44.555.666/0001-22'),
('Global Services', '77.888.999/0001-33'),
('Data Secure Corp', '33.222.111/0001-00'),
('Alpha Consultoria', '66.555.444/0001-77'),
('Beta Software', '55.444.333/0001-88'),
('Gamma Logistics', '22.111.999/0001-66'),
('Omega Networks', '88.999.000/0001-44');

insert into empresa values (default, "Junin Viagens", "9999.9999-123/0001");

CREATE TABLE IF NOT EXISTS `cliente` (
  `idCliente` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `numero` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `cidade` VARCHAR(45) NOT NULL,
  `Dtnascimento` VARCHAR(45) NOT NULL,
  `dtCriacao` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `FkEmpresaCliente` INT NOT NULL,
  PRIMARY KEY (`idCliente`),
  CONSTRAINT fkEmpresaCliente FOREIGN KEY (FkEmpresaCliente) REFERENCES empresa(idEmpresa)
);

SELECT *
FROM cliente
WHERE MONTH(dtCriacao) = MONTH(CURRENT_DATE())
  AND YEAR(dtCriacao) = YEAR(CURRENT_DATE());
  
SELECT COUNT(*) AS quantidade_clientes
FROM cliente
WHERE MONTH(dtCriacao) = MONTH(CURRENT_DATE())
  AND YEAR(dtCriacao) = YEAR(CURRENT_DATE());



SELECT 
    COALESCE(SUM(v.quantidade), 0) AS totalPacotesVendidos,
    COALESCE(SUM(v.quantidade * p.preco), 0.00) AS valorTotalGerado
FROM vendas v
JOIN pacote p ON v.idPacote = p.idPacote
WHERE v.dataVenda BETWEEN DATE_FORMAT(CURDATE(), '%Y-%m-01') 
                     AND LAST_DAY(CURDATE());

SELECT 
    SUM(v.quantidade) AS totalPacotesVendidos,
    SUM(v.quantidade * p.preco) AS valorTotalAno
FROM vendas v
JOIN pacote p ON v.idPacote = p.idPacote
WHERE YEAR(v.dataVenda) = YEAR(CURDATE());

CREATE TABLE IF NOT EXISTS `usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `cpf` varchar(45) NOT NULL,
  `cargo` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `FkEmpresa` INT NOT NULL,
  `superior` INT, 
   PRIMARY KEY (`idUsuario`),
  constraint `fkEmpresaUsuario` foreign key (FkEmpresa) references empresa(idEmpresa),
  constraint `fkSuperior` foreign key (superior) references usuario(idUsuario)
);

insert into usuario (nome, cpf, cargo, email, senha, FkEmpresa) values ("Anaka", "12312312305", "Funcionario", "anaka@gmail.com", "ana123", 1);
drop table usuario;
select * from usuario;
SELECT idUsuario, nome, cargo, email FROM usuario WHERE email = '' OR '1'='1' AND senha = '...';
SELECT idUsuario, nome, cargo, email FROM usuario WHERE email = 'guilherme@gmail.com' AND senha = 'gui22';

SELECT * FROM empresa;

CREATE TABLE IF NOT EXISTS `acao` (
  `idAcao` INT NOT NULL,
  `descricao` VARCHAR(45) NOT NULL,
  `acao` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idAcao`)
);

CREATE TABLE IF NOT EXISTS `pacote` (
  `idPacote` INT AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(45) NOT NULL,
  `qtd_dia` INT NOT NULL,
  `qtd_noite` INT NOT NULL,
  `preco` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`idPacote`)
);

INSERT INTO pacote (nome, descricao, qtd_dia, qtd_noite, preco) VALUES
('Pacote Bronze', 'Pacote básico de hospedagem', 1, 1, 199.90),
('Pacote Prata', 'Pacote intermediário com benefícios extras', 2, 2, 349.90),
('Pacote Ouro', 'Pacote completo com serviços premium', 3, 3, 499.90),
('Pacote Final de Semana', 'Hospedagem para final de semana', 2, 1, 299.90),
('Pacote Lua de Mel', 'Pacote especial para casais', 3, 2, 799.90),
('Pacote Família', 'Pacote para toda a família', 4, 3, 899.90),
('Pacote Aventura', 'Atividades ao ar livre incluídas', 2, 2, 459.90),
('Pacote Relax', 'Spa e massagem inclusos', 1, 2, 379.90),
('Pacote Premium+', 'Hospedagem completa com tudo incluso', 5, 4, 1299.90),
('Pacote Econômico', 'Opção econômica de hospedagem', 1, 0, 149.90),
('Pacote Executivo', 'Indicado para viagens de negócios', 2, 1, 389.90),
('Pacote Romântico', 'Ambiente decorado e jantar incluso', 1, 1, 549.90),
('Pacote Férias', 'Ideal para viagens longas', 7, 6, 1999.90),
('Pacote Experiência Cultural', 'Tour guiado e atividades culturais', 3, 2, 649.90);

insert into pacote values (default, "Maldivas", "blablabla", 7, 6, 10000);

drop table historicoVendas;

select * from historicoVendas; 

CREATE TABLE IF NOT EXISTS `vendas` (
  idVenda INT PRIMARY KEY AUTO_INCREMENT,
  idPacote INT NOT NULL,
  idUsuario INT NOT NULL,
  dataVenda DATE NOT NULL,
  quantidade INT NOT NULL,
  FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario),
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
    SELECT 
    u.nome AS vendedor,
    SUM(v.quantidade) AS totalPacotesVendidos,
    SUM(v.quantidade * p.preco) AS valorTotalGerado
FROM vendas v
JOIN pacote p ON v.idPacote = p.idPacote
JOIN usuario u ON v.idUsuario = u.idUsuario
WHERE MONTH(v.dataVenda) = MONTH(CURRENT_DATE())
  AND YEAR(v.dataVenda) = YEAR(CURRENT_DATE())
GROUP BY u.idUsuario, u.nome
ORDER BY valorTotalGerado DESC
LIMIT 4;

SELECT 
    p.nome AS pacote,
    SUM(v.quantidade) AS totalVendido
FROM vendas v
JOIN pacote p ON v.idPacote = p.idPacote
WHERE MONTH(v.dataVenda) = MONTH(CURRENT_DATE())
  AND YEAR(v.dataVenda) = YEAR(CURRENT_DATE())
GROUP BY p.idPacote, p.nome
ORDER BY totalVendido DESC
LIMIT 4;

SELECT 
    DATE_FORMAT(v.dataVenda, '%Y-%m') AS mes,
    SUM(v.quantidade * p.preco) AS faturamento,
    ROUND(
        (SUM(v.quantidade * p.preco) - LAG(SUM(v.quantidade * p.preco)) 
         OVER (ORDER BY DATE_FORMAT(v.dataVenda, '%Y-%m'))) 
        / LAG(SUM(v.quantidade * p.preco)) 
        OVER (ORDER BY DATE_FORMAT(v.dataVenda, '%Y-%m')) * 100, 2
    ) AS variacao_percentual
FROM vendas v
JOIN pacote p ON v.idPacote = p.idPacote
GROUP BY DATE_FORMAT(v.dataVenda, '%Y-%m')
ORDER BY mes;

-- Janeiro
INSERT INTO vendas (idPacote, idUsuario, dataVenda, quantidade) VALUES
(1, 1, '2025-01-03', 2),
(3, 2, '2025-01-08', 1),
(5, 3, '2025-01-12', 3),
(2, 1, '2025-01-15', 2),
(7, 2, '2025-01-20', 1);

-- Fevereiro
INSERT INTO vendas (idPacote, idUsuario, dataVenda, quantidade) VALUES
(4, 3, '2025-02-02', 2),
(6, 1, '2025-02-05', 1),
(8, 2, '2025-02-10', 3),
(10, 3, '2025-02-14', 2),
(12, 1, '2025-02-18', 1);

-- Março
INSERT INTO vendas (idPacote, idUsuario, dataVenda, quantidade) VALUES
(3, 2, '2025-03-03', 1),
(9, 1, '2025-03-07', 2),
(11, 3, '2025-03-09', 1),
(13, 2, '2025-03-15', 3),
(14, 1, '2025-03-20', 2);

-- Abril
INSERT INTO vendas (idPacote, idUsuario, dataVenda, quantidade) VALUES
(1, 3, '2025-04-01', 2),
(5, 1, '2025-04-04', 1),
(7, 2, '2025-04-10', 3),
(10, 3, '2025-04-12', 2),
(14, 1, '2025-04-18', 1);

-- Maio
INSERT INTO vendas (idPacote, idUsuario, dataVenda, quantidade) VALUES
(2, 2, '2025-05-03', 1),
(4, 3, '2025-05-06', 2),
(6, 1, '2025-05-09', 1),
(8, 2, '2025-05-15', 3),
(12, 3, '2025-05-20', 2);

-- Junho
INSERT INTO vendas (idPacote, idUsuario, dataVenda, quantidade) VALUES
(3, 1, '2025-06-02', 2),
(5, 2, '2025-06-05', 1),
(7, 3, '2025-06-10', 2),
(9, 1, '2025-06-14', 1),
(11, 2, '2025-06-18', 3);

-- Julho
INSERT INTO vendas (idPacote, idUsuario, dataVenda, quantidade) VALUES
(1, 3, '2025-07-01', 1),
(4, 1, '2025-07-04', 2),
(6, 2, '2025-07-09', 1),
(8, 3, '2025-07-13', 2),
(10, 1, '2025-07-20', 3);

-- Agosto
INSERT INTO vendas (idPacote, idUsuario, dataVenda, quantidade) VALUES
(2, 2, '2025-08-03', 2),
(5, 1, '2025-08-06', 1),
(7, 3, '2025-08-09', 2),
(9, 2, '2025-08-14', 3),
(11, 1, '2025-08-18', 1);

-- Setembro
INSERT INTO vendas (idPacote, idUsuario, dataVenda, quantidade) VALUES
(1, 3, '2025-09-02', 2),
(4, 1, '2025-09-05', 1),
(6, 2, '2025-09-10', 2),
(8, 3, '2025-09-14', 3),
(10, 1, '2025-09-20', 1);

-- Outubro
INSERT INTO vendas (idPacote, idUsuario, dataVenda, quantidade) VALUES
(2, 2, '2025-10-03', 2),
(5, 3, '2025-10-06', 1),
(7, 1, '2025-10-09', 3),
(9, 2, '2025-10-14', 2),
(11, 3, '2025-10-18', 1);

-- Novembro
INSERT INTO vendas (idPacote, idUsuario, dataVenda, quantidade) VALUES
(1, 1, '2025-11-02', 2),
(4, 2, '2025-11-05', 1),
(6, 3, '2025-11-10', 2),
(8, 1, '2025-11-14', 1),
(10, 2, '2025-11-20', 3);

-- Dezembro
INSERT INTO vendas (idPacote, idUsuario, dataVenda, quantidade) VALUES
(2, 3, '2025-12-03', 2),
(5, 1, '2025-12-06', 1),
(7, 2, '2025-12-09', 3),
(9, 3, '2025-12-14', 2),
(11, 1, '2025-12-20', 1);


truncate vendas;

select * from vendas;

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
  `uf` CHAR(2) NOT NULL,
  `municipio` VARCHAR(60) NOT NULL,
  `possui_aeroporto` TINYINT NOT NULL,
  `possui_guia` TINYINT NOT NULL,
  `qtd_guia` INT NOT NULL,
  `modais_acesso` VARCHAR(100) NOT NULL,
  `possui_conservacao` TINYINT NOT NULL,
  `possui_termais` TINYINT NOT NULL,
  `presenca_hidrica` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idDestino`)
  );

CREATE TABLE IF NOT EXISTS `historicoPacote` (
`idHistoricoPacote` INT NOT NULL AUTO_INCREMENT,
`fkDestino` INT NOT NULL ,
`fkPacote` INT NOT NULL,
PRIMARY KEY (`idHistoricoPacote`),
CONSTRAINT `fkHistoricoDestino` 
FOREIGN KEY (`fkDestino`)
REFERENCES `destino` (`idDestino`),
CONSTRAINT `fkPacoteHistorico`
FOREIGN KEY (`fkPacote`)
REFERENCES `pacote`(`idPacote`)
);

CREATE TABLE IF NOT EXISTS `historicoVendas` (
`idHistoricoVendas` INT NOT NULL,
`cidade` VARCHAR(45) NOT NULL,
`uf` VARCHAR(45) NOT NULL,
`turistas` INT NOT NULL,
`cluster` VARCHAR(45) NOT NULL,
`fkDestino` INT NOT NULL,
CONSTRAINT `fkDestinoHistoricoVendas`
FOREIGN KEY (`fkDestino`)
REFERENCES `destino`(`idDestino`)
);

show tables;
select * from usuario;
