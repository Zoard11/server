import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import express from 'express';
import * as uploadDb from './db/uploadDb.js';
import * as deleteDb from './db/deleteDb.js';
import fs from 'fs';
import multer from 'multer';
import * as requestDb from './db/requests.js';
import * as updateDb from './db/updateDb.js';

const router = express.Router();

const upload = multer({ dest: 'tmp/csv/' });

router.get('/getInformation/:name', async (req, resp) => {
  try {
    if (req.params.name) {
        const name = req.params.name.toString().trim();
        const result = await requestDb.selectByName(name);

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
    console.log(err);
    const errorMessage = err.message;
    const obj = {};
    obj.errorMessage = errorMessage;
    const jsonString = JSON.stringify(obj);
    resp.status(500).json(jsonString);
  }
});

router.post('/uploadFile',  upload.single('file'),async (req, resp) => {
   
    try {
      if (req.file.filename) {
          const result0 = await deleteDb.deleteIngredients();
          const result = await uploadDb.changeIngredients(req.file.filename);
  

          resp.status(204).send()

          
      } else {
        const errorMessage = 'File is missing!';
        const obj = {};
        obj.errorMessage = errorMessage;
        const jsonString = JSON.stringify(obj);
        resp.status(400).json(jsonString);
      }
    } catch (err) {
      console.log(err);
      const errorMessage = err.message;
      const obj = {};
      obj.errorMessage = errorMessage;
      const jsonString = JSON.stringify(obj);
      resp.status(500).json(jsonString);
    }
});


router.get('/', async (req, resp) => {
  try {


    const dataPerPage = parseInt(req.query.dataPerPage);
    const indexOfFirstResult = parseInt(req.query.indexOfFirstResult);
    const search = `${req.query.search}%`;


    if(search){
          // filter

      if(indexOfFirstResult === -1){

        const db= await requestDb.IngredientsNumberFilter(search)

        let indexFirstResult = parseInt(db/dataPerPage)*dataPerPage;
        if(indexFirstResult===db){
          indexFirstResult=indexFirstResult-1;
        }



        await requestDb.selectBySizeAndByFirstIndexFilter(dataPerPage,indexFirstResult,search)
        .then(result => {
          if(result){
            result.currentPage=indexFirstResult;
            const response = {
              result: result,
              currentPage: parseInt(indexFirstResult/dataPerPage)+1,
          }
            resp.json(response);
          } 
          else{
            resp.json('There is no ingredients in the database.');
          }
        })
          .catch(function (error) {
            console.log(error);
            resp.status(500).json('Database error.');
          }
          );
    }
    else{

      const r=await requestDb.selectBySizeAndByFirstIndexFilter(dataPerPage,indexOfFirstResult,search)
        .then(result => {
          if(result){
            
            resp.json(result);
          } 
          else{
            resp.json('There is no ingredients in the database.');
          }
        })
          .catch(function (error) {
            console.log(error);
            resp.status(500).json('Database error.');
          }
          );

    } 
    } else{
      if(indexOfFirstResult === -1){

        const db= await requestDb.IngredientsNumber()


        let indexFirstResult = parseInt(db/dataPerPage)*dataPerPage;
        if(indexFirstResult===db){
          indexFirstResult=indexFirstResult-1;
        }



        await requestDb.selectBySizeAndByFirstIndex(dataPerPage,indexFirstResult)
        .then(result => {
          if(result){
            result.currentPage=indexFirstResult;
            const response = {
              result: result,
              currentPage: parseInt(indexFirstResult/dataPerPage)+1,
          }
            resp.json(response);
          } 
          else{
            resp.json('There is no ingredients in the database.');
          }
        })
          .catch(function (error) {
            console.log(error);
            resp.status(500).json('Database error.');
          }
          );
    }
    else{
      await requestDb.selectBySizeAndByFirstIndex(dataPerPage,indexOfFirstResult)
        .then(result => {
          if(result){
            resp.json(result);
          } 
          else{
            resp.json('There is no ingredients in the database.');
          }
        })
          .catch(function (error) {
            console.log(error);
            resp.status(500).json('Database error.');
          }
          );
    }        
      
    }
    

    
    

  } catch (err) {
    console.log(err);
    const errorMessage = err.message;
    const obj = {};
    obj.errorMessage = errorMessage;
    const jsonString = JSON.stringify(obj);
    resp.status(500).json(jsonString);
  }
});

router.put('/update/:id', async (req, resp) => {
  try {
    if (req.params.id) {


        await updateDb.updateIngredient(req.body.data,req.params.id,)
        .then(result => {
          resp.status(204).send();
        })
          .catch(function (error) {
            console.log(error);
            resp.status(500).json('Database error.');
          }
          );

        
    } else {
      const errorMessage = 'Id is missing!';
      const obj = {};
      obj.errorMessage = errorMessage;
      const jsonString = JSON.stringify(obj);
      resp.status(400).json(jsonString);
    }
  } catch (err) {
    console.log(err);
    const errorMessage = err.message;
    const obj = {};
    obj.errorMessage = errorMessage;
    const jsonString = JSON.stringify(obj);
    resp.status(500).json(jsonString);
  }
});

router.delete('/delete/:id', async (req, resp) => {
  try {
    console.log(req.params);
    if (req.params.id) {

        await deleteDb.deleteIngredientById(req.params.id,)
        .then(result => {
          resp.status(204).send();
        })
          .catch(function (error) {
            console.log(error);
            resp.status(500).json('Database error.');
          }
          );

        
    } else {
      const errorMessage = 'Id is missing!';
      const obj = {};
      obj.errorMessage = errorMessage;
      const jsonString = JSON.stringify(obj);
      resp.status(400).json(jsonString);
    }
  } catch (err) {
    console.log(err);
    const errorMessage = err.message;
    const obj = {};
    obj.errorMessage = errorMessage;
    const jsonString = JSON.stringify(obj);
    resp.status(500).json(jsonString);
  }
});

export default router;
