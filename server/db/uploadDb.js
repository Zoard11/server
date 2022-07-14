import * as fs from 'fs';
import dbConnection from './connection.js';

export function changeIngredients(filename) {
  return new Promise((resolve, reject) => {
    const filepath = `tmp/csv/${filename}`;
    const query = `LOAD DATA LOCAL  INFILE '${filepath}' INTO TABLE Ingredients FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS ( \`COSING Ref No\`,\`INCI name\`,\`INN name\`,\`Ph. Eur. Name\`,\`CAS No\`,\`EC No\`,\`Chem/IUPAC Name / Description\`,\`Restriction\`,\`Function\`,@date_variable ) SET \`Update Date\` = STR_TO_DATE(@date_variable, '%d/%m/%Y');`;
    dbConnection
      .executeQuery(query)
      .then(result => {
        const filepath = `tmp/csv/${filename}`;
        fs.unlinkSync(filepath);
        resolve(result);
      })
      .catch(error => {
        console.log(error);
        const filepath = `tmp/csv/${filename}`;
        fs.unlinkSync(filepath);
        reject(error);
      });
  });
}
