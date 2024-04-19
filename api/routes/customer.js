const express = require('express');
const router = express.Router();
const customerController = require('../controller/CustomerController')
const checkAuth = require('../middleware/check-auth');

router.get('/', customerController.GetCustomers);
// router.get('/details', userController.UserDetails);
router.post('/register', checkAuth, customerController.RegisterCustomer);
router.post('/authentication', customerController.CustomerAuth);

module.exports = router;