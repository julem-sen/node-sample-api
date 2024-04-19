const express = require('express');
const app = express();

const userRoutes = require('./../api/routes/users');
const customerRoutes = require('./../api/routes/customer')
const motorcycleRoutes = require('./../api/routes/motorcycle');

app.use('/users', userRoutes);
app.use('/customers', customerRoutes);
app.use('/motorcycle', motorcycleRoutes);


module.exports = app;