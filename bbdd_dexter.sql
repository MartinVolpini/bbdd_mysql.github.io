create database dexter;
use dexter;

-- CREATE TABLE `empleados` (
--   `id` int NOT NULL AUTO_INCREMENT,
--   `nombre` varchar(255) DEFAULT NULL,
--   `apellido` varchar(255) DEFAULT NULL,
--   `tel` int DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- );
-- INSERT INTO empleados (nombre, apellido, email) VALUES ("Carla", "Funes", "carla@hotmail.com"); 
-- INSERT INTO empleados (nombre, apellido, email) VALUES ("Sofia", "Dominguez", "sofi@gmail.com"); 
-- INSERT INTO empleados (nombre, apellido, email) VALUES ("Carlos", "Perez", "car_perez@gmail.com");
-- INSERT INTO empleados (nombre, apellido, email) VALUES ("Romina", "Ichazo", "romina@gmail.com");

select * from empleados;
set sql_safe_updates = 0; 
UPDATE empleados SET nombre = "Leonel" WHERE id = 3;