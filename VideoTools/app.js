
const express = require('express');

const app = express();

const videoToolRouter = require('./videoTools');

app.use(videoToolRouter);

app.listen(4437);
