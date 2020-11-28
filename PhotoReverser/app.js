
const express = require('express');

const app = express();

const testRouter = require('./testrouter');

app.use(testRouter);

app.listen(4437);
