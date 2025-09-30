CREATE DATABASE zump1;

USE zump1;

CREATE TABLE usuario(
idUsuario INT primary key auto_increment,
nomeUsuario VARCHAR(45),
emailUsuario VARCHAR(60),
senhaUsuario VARCHAR(30),
tipoUsuario VARCHAR(30),
constraint ckhTipo check(tipoUsuario in("Administrador", "Comum"))
);

INSERT INTO usuario (nomeUsuario, emailUsuario, senhaUsuario, tipoUsuario) VALUES ("Guilherme", "guilherme@gmail.com", "gui12345", "Administrador"),
																				  ("Vitor", "vitor@gmail.com", "vitor12345", "Administrador"),
                                                                                  ("Ana", "ana@gmail.com", "ana12345", "Administrador"),
                                                                                  ("Lucas", "lucas@gmail.com", "lucas12345", "Administrador"),
                                                                                  ("Samuel", "samuel@gmail.com", "samuel12345", "Administrador"),
                                                                                  ("Matheus", "matheus@gmail.com", "ma12345", "Administrador");
                                                                                  