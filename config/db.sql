DROP DATABASE comp;
CREATE DATABASE comp;
USE comp;


CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    role VARCHAR(100),
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  
);

INSERT INTO users(role, name, email, password)
VALUES("admin", "Alex", "alex@gmail.com", "0000");



