import express from 'express';
import cookieParser from 'cookie-parser';

import apiRouter from './routes/api.js';
import { createAllTable } from './db/createTables.js';
import { decodeJWTToken } from './middleware/auth.js';
import authRouter from './routes/authRouter.js';

const app = express();
const port = process.env.PORT || 8080;

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET,DELETE,PATCH");
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });
  
app.use(express.json());

app.use(cookieParser());
app.use(decodeJWTToken);

app.use('/api', apiRouter);
app.use('/api/auth', authRouter);

createAllTable().then(() => {
  app.listen(port, () => { console.log('Server listening...'); });
});  
