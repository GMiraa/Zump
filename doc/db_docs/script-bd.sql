CREATE DATABASE zump;
USE zump;


CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    numero CHAR(11),
    email VARCHAR(70),
    cidade VARCHAR(45),
    nascimento DATETIME
);

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    cargo VARCHAR(45),
    email VARCHAR(80),
    cliente_id INT,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id)
);

CREATE TABLE destino (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estado VARCHAR(45),
    cidade VARCHAR(45)
);

CREATE TABLE pacote (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    descricao VARCHAR(205),
    qtd_dias INT,
    qtd_noites INT,
    preco FLOAT,
    destino_id INT,
    FOREIGN KEY (destino_id) REFERENCES destino(id)
);

CREATE TABLE avaliacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    pacote_id INT,
    nota INT,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (pacote_id) REFERENCES pacote(id)
);

CREATE TABLE ponto_turistico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    tipo VARCHAR(45),
    descricao VARCHAR(205),
    destino_id INT,
    FOREIGN KEY (destino_id) REFERENCES destino(id)
);