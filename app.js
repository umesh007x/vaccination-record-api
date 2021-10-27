const express = require('express');
const vaccinationRouter = require('./routes/vaccinationRouter');
const app = express();

// parsing data
app.use(express.json());

app.use('/api/v1', vaccinationRouter);
module.exports = app;
