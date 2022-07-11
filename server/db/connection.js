import mysql from 'mysql';
import autoBind from 'auto-bind';

export class DbConnection {
  constructor() {
    this.pool = mysql.createPool({
      database: 'InciDatabase',
      host: 'mysqldb',
      port: 3306,
      user: 'InciUser',
      password: 'password',
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
