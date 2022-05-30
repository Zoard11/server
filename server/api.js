import express from 'express';
import * as db from './database.js';

const router = express.Router();

router.get('/getInformation/:name_with_spaces', async (req, resp) => {
  try {
    if (req.params.name_with_spaces) {
        const name = req.params.name_with_spaces.toString().trim();
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

export default router;
