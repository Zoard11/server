--     mysql -u root -p <setup.sql

CREATE DATABASE IF NOT EXISTS InciDatabase;


USE InciDatabase;




LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Ingredients.csv'
INTO TABLE Ingredients
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
( `COSING Ref No`,`INCI name`,`INN name`,`Ph. Eur. Name`,`CAS No`,`EC No`,`Chem/IUPAC Name / Description`,`Restriction`,`Function`,@date_variable )
SET `Update Date` = STR_TO_DATE(@date_variable, '%d/%m/%Y');


SET SQL_SAFE_UPDATES = 0;


CREATE USER 'InciUser'@'localhost' IDENTIFIED WITH mysql_native_password  BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'InciUser'@'localhost' ;
