import sqlite3 from 'sqlite3';

import * as fs from 'fs';
import  csv from 'csv-parser';

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

  export function deleteDatabase  ()  {
    return new Promise((resolve,reject) => {
        const query = 'Delete FROM ingredients ';
        db.get(query , (err,data) => {
            if(err) return reject(err);
            return resolve(data);
        });
      });
    
  };
  export function changeDatabase  (filename)  {
    const insrow = db.prepare( 'insert into ingredients ( "COSING Ref No","INCI name","INN name","Ph. Eur. Name","CAS No","EC No","Chem/IUPAC Name / Description","Restriction","Function","Update Date" ) VALUES (?, ?, ?,?, ?, ?,?, ?, ?,?)' );
    // return new Promise((resolve,reject) => {
    //     const query = `.import tmp/csv/${filename} ingredients `;
    //     // const query = `.import inci.csv ingredients `;
    //     db.run(query , (err,data) => {
    //         if(err) return reject(err);
    //         return resolve(data);
    //     });
    //   });
    // try{
    //     console.log(`.import "D:/Zoard/Egyetem/III ev/Mobil/server/server/tmp/csv/${filename}" ingredients `);
    //     const query = `.import "D:/Zoard/Egyetem/III ev/Mobil/server/server/tmp/csv/${filename}" ingredients `;
    //     // const query = `.import inci.csv ingredients `;
    //     db.run(query , (err,data) => {
    //         if(err) return (err);
    //         return (data);
    //     });
    // } catch (error) {
    //         console.log('Error');
    //         console.log(error);
    //     }

    try{
        const filepath=`tmp/csv/${filename}`;
        console.log(filepath);
        let nr=1;
        fs.createReadStream(filepath)
        .pipe(csv({"separator":","}))
        .on('data', (row) => {
            // insrow.run( row['COSING Ref No'],row['INCI name'],row['INN name'],row['Ph. Eur. Name'],row['CAS No'],row['EC No'],row['Chem/IUPAC Name / Description'],row['Restriction'],row['Function'],row['Update Date'] );
            // console.log(nr);
            nr=nr+1;
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            console.log(filepath);
            fs.unlinkSync(filepath);
        });
    } catch (error) {
        console.log('Error');
        console.log(error);
    }
  };
  
  export function selectTopTen  ()  {
    return new Promise((resolve,reject) => {
        const query = 'select * from ingredients limit 10 ';
        db.all(query , (err,data) => {
            if(err) return reject(err);
            console.log(data);
            return resolve(data);
        });
      });
      
  };
  export function selectAll  ()  {
    return new Promise((resolve,reject) => {
        const query = 'select * from ingredients ';
        db.all(query , (err,data) => {
            if(err) return reject(err);
            return resolve(data);
        });
      });
    };