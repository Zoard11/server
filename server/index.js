import express from 'express';

import apiRouter from './api.js';


const app = express();
const port = process.env.PORT || 7070;

app.use('/api', apiRouter);

app.listen(port, () => { console.log('Server listening...'); });
