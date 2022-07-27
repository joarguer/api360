import express from 'express';

import cors from 'cors';

import registraduriApi from './src/routes/index.js';

const app = express();

app.use(cors());

import morgan from 'morgan';


// Settings
app.set('port', process.env.PORT || 3000);

//midedware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routers
//app.use('/api/',require('./routes/index'));
app.use(registraduriApi);

//starting express server
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server listening on port 3000');
});