import sqlite3 from 'sqlite3';

const db = new sqlite3.Database("./www/incidatabase.db",sqlite3.OPEN_READWRITE,(err)=>{
    if(err) return console.log(err.message);

    console.log('Connection succesful!');

});


export function selectByName  (name)  {
    return new Promise((resolve,reject) => {
        const query = `Select * FROM ingredients Where "INCI name" LIKE '${name}' `;
        db.get(query , (err,data) => {
            if(err) return reject(err);
            return resolve(data);
        });
      });
    
  };
