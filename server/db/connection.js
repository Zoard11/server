import mysql from 'mysql';
import autoBind from 'auto-bind';
import * as fs from 'fs';

export class DbConnection {
  constructor() {
    this.pool = mysql.createPool({
      database: 'db',
      host: 'localhost',
      port: 3306,
      user: 'user',
      password: 'user',
    });
    autoBind(this);
  }

  executeQuery(query, options = []) {
    return new Promise((resolve, reject) => {
      this.pool.query(query, options, (error, results) => {
        if (error) {
          reject(new Error(`Error while running '${query}: ${error}'`));
        }
        resolve(results);
      });
    });
  }

}

export default new DbConnection();
