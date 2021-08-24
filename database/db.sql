CREATE DATABASE database_funeral;

USE database_funeral;

-- USERS TABLE
CREATE TABLE users(
   id INT(11) NOT NULL,
   username VARCHAR(16) NOT NULL,
   password VARCHAR(60) NOT NULL,
   fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE users;

-- LINKS TABLE
CREATE TABLE beneficiarios (
    id INT(11) NOT NULL,
    noempleado VARCHAR(150) NOT NULL,
    delegacion VARCHAR(150) NOT NULL,
    ct VARCHAR(150), NOT NULL,
    trabajador VARCHAR(150) NOT NULL,
    curp VARCHAR(18) NOT NULL,
    mail VARCHAR(150) NOT NULL,
    cel VARCHAR(150) NOT NULL,
    sexo VARCHAR(1) NOT NULL,
    tiposerv VARCHAR(150) NOT NULL,
    beneficiario VARCHAR(150) NOT NULL,
    edad INT(11) NOT NULL,
    parentesco VARCHAR(150) NOT NULL,
    curpb VARCHAR(18) NOT NULL,
    sexob VARCHAR(1) NOT NULL,
    tiposervb VARCHAR(150) NOT NULL,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)

);

ALTER TABLE beneficiarios
    ADD PRIMARY KEY (id);

ALTER TABLE beneficiarios
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;