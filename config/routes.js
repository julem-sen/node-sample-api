const express = require('express');
const app = express();

const userRoutes = require('./../api/routes/users');
const customerRoutes = require('./../api/routes/customer')

app.use('/users', userRoutes);
app.use('/customers', customerRoutes);


module.exports = app;