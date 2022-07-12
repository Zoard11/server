import mysql from 'mysql';
import autoBind from 'auto-bind';

export class DbConnection {
  constructor() {
    this.pool = mysql.createPool({
      // local database:
      // host: 'localhost',
      // port: 3306,
      // user: 'InciUser',
      // password: 'password',
      // database: 'InciDatabase',
      // docker:
      // host: 'mysqldb',
      // port: 3306,
      // user: 'InciUser',
      // password: 'password',
      // database: 'InciDatabase',
      //remote mysql database
      host: 'sql11.freesqldatabase.com',
      port: 3306,
      user: 'sql11505882',
      password: 'DLm38clbD8',
      database: 'sql11505882',
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
