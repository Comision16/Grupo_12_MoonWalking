-- En la tabla de usuarios hay un id pedido que no tiene relación porque todavía no creamos ni la tabla de ventas ni la de pedidos porque por ahora Eric dijo que no era necesario
-- DROP DATABASE IF EXISTS moonwalking ;

CREATE DATABASE IF NOT EXISTS moonwalking DEFAULT CHARACTER SET utf8mb4;
USE moonwalking;

CREATE TABLE IF NOT EXISTS moonwalking.rol (
  idRol INT NOT NULL AUTO_INCREMENT,
  admin TINYINT NULL,
  user TINYINT NULL,
  PRIMARY KEY (idRol)
  );
  
CREATE TABLE IF NOT EXISTS moonwalking.users (
  idUser INT NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(45) NOT NULL,
  lastName VARCHAR(45) NOT NULL,
  dni INT NOT NULL,
  email VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL,
  image VARCHAR(200) NOT NULL,
  idRol INT NOT NULL,
  idPedido INT NULL,
  PRIMARY KEY (idUser),
  FOREIGN KEY (idRol) REFERENCES moonwalking.rol (idRol) ON DELETE CASCADE ON UPDATE CASCADE
  );

CREATE TABLE IF NOT EXISTS moonwalking.products (
  idProducts INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(250) NOT NULL,
  brand VARCHAR(45) NOT NULL,
  price DECIMAL(5,3) NOT NULL,
  description TEXT NOT NULL,
  dues TINYINT NOT NULL,
  idSize INT NOT NULL,
  image VARCHAR(200) NOT NULL,
  stock INT NULL,
  category VARCHAR(45) NOT NULL,
  PRIMARY KEY (idProducts)
  );

CREATE TABLE IF NOT EXISTS moonwalking.sizes (
  idSize INT NOT NULL AUTO_INCREMENT,
  number TINYINT NULL,
  PRIMARY KEY (idSize)
  );

CREATE TABLE IF NOT EXISTS moonwalking.products_has_sizes (
  products_idProducts INT NOT NULL,
  sizes_idSize INT NOT NULL,
  PRIMARY KEY (products_idProducts, sizes_idSize),
  FOREIGN KEY (products_idProducts) REFERENCES moonwalking.products (idProducts) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (sizes_idSize) REFERENCES moonwalking.sizes (idSize) ON DELETE CASCADE ON UPDATE CASCADE
  );
  
CREATE TABLE moonwalking.userImages (
  idImage INT NOT NULL AUTO_INCREMENT,
  filename VARCHAR(255) NOT NULL,
  idUser INT NOT NULL,
  PRIMARY KEY (idImage),
  FOREIGN KEY (idUser) REFERENCES moonwalking.users (idUser) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE moonwalking.productImages (
idImage INT NOT NULL AUTO_INCREMENT,
filename VARCHAR(255) NOT NULL,
idProduct INT NOT NULL,
PRIMARY KEY (idImage),
FOREIGN KEY (idProduct) REFERENCES moonwalking.products (idProducts) ON DELETE CASCADE ON UPDATE CASCADE
);
