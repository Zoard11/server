import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import express from 'express';
import * as db from './database.js';
import fs from 'fs';
import multer from 'multer';
 
const router = express.Router();

const upload = multer({ dest: 'tmp/csv/' });

router.get('/getInformation/:name', async (req, resp) => {
  try {
    if (req.params.name) {
        const name = req.params.name.toString().trim();
        console.log(name); 
        const result = await db.selectByName(name);

        if(result){
          resp.json(result);
        } 
        else{
          resp.json('There is no ingredient with this name.');
        }
        
    } else {
      const errorMessage = 'Name is missing!';
      const obj = {};
      obj.errorMessage = errorMessage;
      const jsonString = JSON.stringify(obj);
      resp.status(400).json(jsonString);
    }
  } catch (err) {
    const errorMessage = err.message;
    const obj = {};
    obj.errorMessage = errorMessage;
    const jsonString = JSON.stringify(obj);
    resp.status(500).json(jsonString);
  }
});

router.post('/uploadFile',  upload.single('file'),async (req, resp) => {
    console.log("uploadFile");
   
    try {
      if (req.file.filename) {
        console.log(req.file.filename);
          // const result0 = await db.deleteDatabase();
          const result = await db.changeDatabase(req.file.filename);
  
          if(result){
            const errorMessage = 'Database error!';
            const obj = {};
            obj.errorMessage = errorMessage;
            const jsonString = JSON.stringify(obj);
            resp.status(500).json(jsonString);
           
          } 
          else{
            resp.status(204).send()
          }
          
      } else {
        const errorMessage = 'File is missing!';
        const obj = {};
        obj.errorMessage = errorMessage;
        const jsonString = JSON.stringify(obj);
        resp.status(400).json(jsonString);
      }
    } catch (err) {
      const errorMessage = err.message;
      const obj = {};
      obj.errorMessage = errorMessage;
      const jsonString = JSON.stringify(obj);
      resp.status(500).json(jsonString);
    }
});

router.get('/topTen', async (req, resp) => {
  try {

    console.log("Top ten");
    const result = await db.selectTopTen();

    if(result){
      resp.json(result);
    } 
    else{
      resp.json('There is no ingredients in the database.');
    }
    

  } catch (err) {
    const errorMessage = err.message;
    const obj = {};
    obj.errorMessage = errorMessage;
    const jsonString = JSON.stringify(obj);
    resp.status(500).json(jsonString);
  }
});

router.get('/all', async (req, resp) => {
  try {

    const result = await db.selectAll();

    if(result){
      resp.json(result);
    } 
    else{
      resp.json('There is no ingredients in the database.');
    }
    

  } catch (err) {
    const errorMessage = err.message;
    const obj = {};
    obj.errorMessage = errorMessage;
    const jsonString = JSON.stringify(obj);
    resp.status(500).json(jsonString);
  }
});


export default router;
