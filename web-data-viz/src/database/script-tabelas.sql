CREATE DATABASE IF NOT EXISTS zump1;
USE zump1;

-- Tabelas Independentes ou Base
CREATE TABLE IF NOT EXISTS empresa (
    idEmpresa INT primary key auto_increment,
    NomeEmpresa varchar(60) NOT NULL,
    CNPJ varchar(25) NOT NULL
);

select * from empresa;

CREATE TABLE IF NOT EXISTS pacote (
    idPacote INT auto_increment,
    nome VARCHAR(45) NOT NULL,
    descricao VARCHAR(45) NOT NULL,
    qtd_dia INT NOT NULL,
    qtd_noite INT NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    cidade VARCHAR(60) NOT NULL,
    uf CHAR(2) NOT NULL,
    FkEmpresa INT NOT NULL,
	CONSTRAINT fkEmpresaPacote FOREIGN KEY (FkEmpresa) REFERENCES empresa(idEmpresa),
    PRIMARY KEY (`idPacote`)
);

drop table pacote;
drop table vendas;
drop table historicoPacote;
-- Tabelas com Dependências
CREATE TABLE IF NOT EXISTS cliente (
    idCliente INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    cpf CHAR(14) NOT NULL,
    telefone VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    cidade VARCHAR(45) NOT NULL,
    Dtnascimento VARCHAR(45) NOT NULL,
    dtCriacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FkEmpresaCliente INT NOT NULL,
    PRIMARY KEY (`idCliente`),
    CONSTRAINT fkEmpresaCliente FOREIGN KEY (FkEmpresaCliente) REFERENCES empresa(idEmpresa)
);

CREATE TABLE IF NOT EXISTS usuario (
    idUsuario INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    cpf varchar(45) NOT NULL,
    cargo VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    senha VARCHAR(256) NOT NULL,
    bloqueado BOOLEAN,
    ativo BOOLEAN,
    DtCriacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FkEmpresa INT NOT NULL,
    superior INT,
    PRIMARY KEY (`idUsuario`),
    CONSTRAINT fkSuperior FOREIGN KEY (superior) REFERENCES usuario(idUsuario),
    CONSTRAINT fkEmpresa FOREIGN KEY (FkEmpresa) REFERENCES empresa(idEmpresa)
);

desc usuario;

CREATE TABLE IF NOT EXISTS vendas (
    idVenda INT PRIMARY KEY auto_increment,
    idPacote INT NOT NULL,
    idUsuario INT NOT NULL,
    idCliente INT NOT NULL,
    dataVenda DATE NOT NULL,
    quantidade INT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (idPacote) REFERENCES pacote(idPacote),
	FOREIGN KEY (idCliente) REFERENCES cliente(idCliente)
);

drop table DESTINO;
drop table historico_vendas;

show tables;

CREATE TABLE DESTINO(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    uf CHAR(2),
    municipio VARCHAR(60),
    possui_aeroporto BOOLEAN,
    possui_guia BOOLEAN,
    qtd_guia INT,
    modais_acesso VARCHAR(100),
    possui_conservacao BOOLEAN,
    possui_termais BOOLEAN,
    presenca_hidrica VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS historico_vendas (
  idHistoricoVendas INT NOT NULL AUTO_INCREMENT,
  cidade VARCHAR(45),
  uf VARCHAR(45),
  turistas INT,
  cluster VARCHAR(45),
  fkDestino INT NOT NULL,
  PRIMARY KEY (idHistoricoVendas),
  INDEX idx_histvend_destino (fkDestino),
  CONSTRAINT fk_histvend_destino FOREIGN KEY (fkDestino)
    REFERENCES DESTINO(ID)
);

CREATE TABLE IF NOT EXISTS historicoPacote (
  idHistoricoPacote INT NOT NULL AUTO_INCREMENT,
  fkDestino INT NOT NULL,
  fkPacote INT NOT NULL,
  PRIMARY KEY (idHistoricoPacote),
  INDEX idx_histpac_destino (fkDestino),
  INDEX idx_histpac_pacote (fkPacote),
  CONSTRAINT fk_histpac_destino FOREIGN KEY (fkDestino)
    REFERENCES DESTINO(ID),
  CONSTRAINT fk_histpac_pacote FOREIGN KEY (fkPacote)
    REFERENCES pacote(idPacote)
);

CREATE TABLE LOG_EXCEL (
     id BIGINT AUTO_INCREMENT PRIMARY KEY,
     data_hora VARCHAR(20) NOT NULL,
     acao VARCHAR(50) NOT NULL,
     arquivo VARCHAR(100) NOT NULL,
     detalhes VARCHAR(1000)
     );

-- Inserir uma empresa

INSERT INTO empresa values (default, "Brasil Viagens", " XX.XXX.XXX/YYYY-ZZ");

-- 1. Inserir Pacotes (Necessário inserir antes das vendas para respeitar FK)
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

drop table pacote;

INSERT INTO pacote values (default, "Maldivas", "blablabla", 7, 6, 10000);

select * from vendas;

-- 2. Inserir Vendas
-- Janeiro
INSERT INTO vendas (idPacote, idUsuario, idCliente, dataVenda, quantidade) VALUES
(1, 3, 1, '2025-01-03', 2),
(3, 4, 2, '2025-01-08', 1),
(5, 5, 3, '2025-01-12', 3),
(2, 3, 4, '2025-01-15', 2),
(7, 4, 5, '2025-01-20', 1);

-- Fevereiro
INSERT INTO vendas (idPacote, idUsuario, idCliente, dataVenda, quantidade) VALUES
(4, 5, 1, '2025-02-02', 2),
(6, 3, 2, '2025-02-05', 1),
(8, 4, 3, '2025-02-10', 3),
(10, 5, 4, '2025-02-14', 2),
(12, 3, 5, '2025-02-18', 1);

-- Março
INSERT INTO vendas (idPacote, idUsuario, idCliente, dataVenda, quantidade) VALUES
(3, 4, 1, '2025-03-03', 1),
(9, 3, 2, '2025-03-07', 2),
(11, 5, 3, '2025-03-09', 1),
(13, 4, 4, '2025-03-15', 3),
(14, 3, 5, '2025-03-20', 2);

-- Abril
INSERT INTO vendas (idPacote, idUsuario, idCliente, dataVenda, quantidade) VALUES
(1, 5, 2, '2025-04-01', 2),
(5, 3, 3, '2025-04-04', 1),
(7, 4, 1, '2025-04-10', 3),
(10, 5, 5, '2025-04-12', 2),
(14, 3, 4, '2025-04-18', 1);

-- Maio
INSERT INTO vendas (idPacote, idUsuario, idCliente, dataVenda, quantidade) VALUES
(2, 4, 3, '2025-05-03', 1),
(4, 5, 1, '2025-05-06', 2),
(6, 3, 4, '2025-05-09', 1),
(8, 4, 2, '2025-05-15', 3),
(12, 5, 5, '2025-05-20', 2);

-- Junho
INSERT INTO vendas (idPacote, idUsuario, idCliente, dataVenda, quantidade) VALUES
(3, 3, 1, '2025-06-02', 2),
(5, 4, 5, '2025-06-05', 1),
(7, 5, 2, '2025-06-10', 2),
(9, 3, 3, '2025-06-14', 1),
(11, 4, 4, '2025-06-18', 3);

-- Julho
INSERT INTO vendas (idPacote, idUsuario, idCliente, dataVenda, quantidade) VALUES
(1, 5, 3, '2025-07-01', 1),
(4, 3, 1, '2025-07-04', 2),
(6, 4, 5, '2025-07-09', 1),
(8, 5, 2, '2025-07-13', 2),
(10, 3, 4, '2025-07-20', 3);

-- Agosto
INSERT INTO vendas (idPacote, idUsuario, idCliente, dataVenda, quantidade) VALUES
(2, 4, 2, '2025-08-03', 2),
(5, 3, 3, '2025-08-06', 1),
(7, 5, 1, '2025-08-09', 2),
(9, 4, 5, '2025-08-14', 3),
(11, 3, 4, '2025-08-18', 1);

-- Setembro
INSERT INTO vendas (idPacote, idUsuario, idCliente, dataVenda, quantidade) VALUES
(1, 5, 5, '2025-09-02', 2),
(4, 3, 2, '2025-09-05', 1),
(6, 4, 1, '2025-09-10', 2),
(8, 5, 3, '2025-09-14', 3),
(10, 3, 4, '2025-09-20', 1);

-- Outubro
INSERT INTO vendas (idPacote, idUsuario, idCliente, dataVenda, quantidade) VALUES
(2, 4, 1, '2025-10-03', 2),
(5, 5, 5, '2025-10-06', 1),
(7, 3, 2, '2025-10-09', 3),
(9, 4, 3, '2025-10-14', 2),
(11, 5, 4, '2025-10-18', 1);

-- Novembro
INSERT INTO vendas (idPacote, idUsuario, idCliente, dataVenda, quantidade) VALUES
(1, 1, 3, '2025-11-02', 2),
(4, 2, 1, '2025-11-05', 1),
(6, 3, 5, '2025-11-10', 2),
(8, 4, 2, '2025-11-14', 1),
(10, 1, 4, '2025-11-20', 3);

-- Dezembro
INSERT INTO vendas (idPacote, idUsuario, idCliente, dataVenda, quantidade) VALUES
(2, 1, 1, '2025-12-03', 2),
(5, 2, 2, '2025-12-06', 1),
(7, 3, 3, '2025-12-09', 3),
(9, 4, 4, '2025-12-14', 2),
(11, 1, 5, '2025-12-20', 1);

show tables;

select * from cliente;
select * from usuario;
update usuario set bloqueado = false where idUsuario = 3;
select * from vendas;

-- Total de pacotes vendidos e valor total gerado nos últimos 365 dias
SELECT
    SUM(v.quantidade) AS totalPacotesVendidos,
    SUM(v.quantidade * p.preco) AS valorTotalGerado
FROM vendas v
JOIN pacote p ON v.idPacote = p.idPacote
WHERE v.dataVenda >= CURDATE() - INTERVAL 365 DAY;

-- Total de pacotes vendidos e valor total gerado nos últimos 30 dias
SELECT
    SUM(v.quantidade) AS totalPacotesVendidos,
    SUM(v.quantidade * p.preco) AS valorTotalGerado
FROM vendas v
JOIN pacote p ON v.idPacote = p.idPacote
WHERE v.dataVenda >= CURDATE() - INTERVAL 30 DAY;

-- Faturamento Mensal e Variação Percentual (Month over Month)
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

-- Top 4 Vendedores (por valor gerado) no mês atual
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

-- Top 4 Pacotes mais vendidos no mês atual
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

-- Clientes criados no mês atual
SELECT *
FROM cliente
WHERE MONTH(dtCriacao) = MONTH(CURRENT_DATE())
  AND YEAR(dtCriacao) = YEAR(CURRENT_DATE());

-- Quantidade de clientes criados no mês atual
SELECT COUNT(*) AS quantidade_clientes
FROM cliente
WHERE MONTH(dtCriacao) = MONTH(CURRENT_DATE())
  AND YEAR(dtCriacao) = YEAR(CURRENT_DATE());

-- Relatório consolidado do mês atual (COALESCE para evitar nulos)
SELECT
    COALESCE(SUM(v.quantidade), 0) AS totalPacotesVendidos,
    COALESCE(SUM(v.quantidade * p.preco), 0.00) AS valorTotalGerado
FROM vendas v
JOIN pacote p ON v.idPacote = p.idPacote
WHERE v.dataVenda BETWEEN DATE_FORMAT(CURDATE(), '%Y-%m-01')
                     AND LAST_DAY(CURDATE());

-- Relatório consolidado do Ano Atual
SELECT
    SUM(v.quantidade) AS totalPacotesVendidos,
    SUM(v.quantidade * p.preco) AS valorTotalAno
FROM vendas v
JOIN pacote p ON v.idPacote = p.idPacote
WHERE YEAR(v.dataVenda) = YEAR(CURDATE());

INSERT INTO pacote (nome, descricao, qtd_dia, qtd_noite, preco, cidade, uf, FkEmpresa) VALUES 

-- Pacotes da Empresa 1 (Ex: Zump Viagens)

('Fim de Semana na Praia', 'Relaxamento total no litoral', 3, 2, 850.00, 'Praia Grande', 'SP', 1),

('Inverno na Serra', 'Frio, fondue e lareira', 4, 3, 1500.00, 'Campos do Jordão', 'SP', 1),

('Ubatuba Natureza', 'Trilhas e praias preservadas', 5, 4, 1200.00, 'Ubatuba', 'SP', 1);


INSERT INTO pacote (nome, descricao, qtd_dia, qtd_noite, preco, cidade, uf, FkEmpresa) VALUES 
-- RIO DE JANEIRO (RJ)
('Cidade Maravilhosa', 'Cristo Redentor, Pão de Açúcar e praias', 5, 4, 2200.00, 'Rio de Janeiro', 'RJ', 1),
('Charme em Paraty', 'Centro histórico colonial e passeios de barco', 4, 3, 1800.00, 'Paraty', 'RJ', 1),
('Búzios Vip', 'Rua das Pedras e praias cristalinas', 3, 2, 1600.00, 'Armação dos Búzios', 'RJ', 1),

-- MINAS GERAIS (MG)
('História e Arte', 'Igrejas barrocas e museus históricos', 3, 2, 950.00, 'Ouro Preto', 'MG', 1),
('Mar de Minas', 'Canyons, cachoeiras e lanchas', 4, 3, 1600.00, 'Capitólio', 'MG', 1),
('Termas e Relax', 'Águas termais e parques', 3, 2, 800.00, 'Poços de Caldas', 'MG', 1),

-- BAHIA (BA)
('Axé Pelourinho', 'Cultura, gastronomia e Farol da Barra', 6, 5, 2500.00, 'Salvador', 'BA', 1),
('Rota do Descobrimento', 'Praias paradisíacas e muita festa', 7, 6, 3000.00, 'Porto Seguro', 'BA', 1),
('Chapada Diamantina', 'Trilhas, grutas e cachoeiras incríveis', 5, 4, 2100.00, 'Lençóis', 'BA', 1),

-- SANTA CATARINA (SC)
('Ilha da Magia', 'Praias do norte e sul da ilha', 5, 4, 2100.00, 'Florianópolis', 'SC', 1),
('Beto Carrero Trip', 'Diversão no maior parque da América Latina', 4, 3, 1900.00, 'Penha', 'SC', 1),
('Oktoberfest Tour', 'Cultura alemã e cervejarias', 3, 2, 1200.00, 'Blumenau', 'SC', 1),

-- RIO GRANDE DO SUL (RS)
('Natal Luz', 'Encanto, frio e chocolate na serra', 5, 4, 3500.00, 'Gramado', 'RS', 1),
('Vale dos Vinhedos', 'Degustação de vinhos e paisagens', 4, 3, 1750.00, 'Bento Gonçalves', 'RS', 1),

-- PARANÁ (PR)
('Cataratas do Iguaçu', 'Natureza exuberante e compras', 4, 3, 1400.00, 'Foz do Iguaçu', 'PR', 1),
('Jardim Botânico', 'Passeio pelos parques de Curitiba', 3, 2, 750.00, 'Curitiba', 'PR', 1),

-- CEARÁ (CE)
('Paraíso das Dunas', 'Passeios de buggy e lagoas azuis', 5, 4, 2800.00, 'Jericoacoara', 'CE', 1),
('Beach Park & Sol', 'Diversão aquática e praia do futuro', 4, 3, 2300.00, 'Fortaleza', 'CE', 1),

-- PERNAMBUCO (PE)
('Piscinas Naturais', 'Mergulho e resorts beira-mar', 6, 5, 3200.00, 'Porto de Galinhas', 'PE', 1),
('Frevo e Olinda', 'Cultura e carnaval o ano todo', 4, 3, 1500.00, 'Recife', 'PE', 1),

-- GOIÁS (GO)
('Águas Quentes', 'Relaxamento nos maiores parques aquáticos', 3, 2, 1100.00, 'Caldas Novas', 'GO', 1),

-- AMAZONAS (AM)
('Expedição Amazônia', 'Hotel de selva e encontro das águas', 6, 5, 4200.00, 'Manaus', 'AM', 1);

truncate table pacote;
