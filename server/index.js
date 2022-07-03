import express from 'express';

import apiRouter from './api.js';


const app = express();
const port = process.env.PORT || 8080;

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });
  
app.use('/api', apiRouter);

app.listen(port, () => { console.log('Server listening...'); });
