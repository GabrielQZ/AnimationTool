
const express = require('express');
const morgan = require('morgan');

const app = express();

const videoToolRouter = require('./videoTools');

//middlewares
app.use(express.json());
app.use(morgan('dev'));

//routers
app.use(videoToolRouter);

//establish connection to local host
app.listen(4437);
