const express = require('express');
const router = express.Router();
const motorcyleController = require('../controller/MotorcycleController')
const checkAuth = require('../middleware/check-auth');

// router.get('/', motorcyleController.GetMotorcyles);
// // router.get('/details', userController.UserDetails);
// router.post('/post', checkAuth, motorcyleController.PostMotorcycle);

module.exports = router;

'MCYEARMONTHDAYHOURMINSSECONDS'