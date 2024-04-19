const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController')
const checkAuth = require('../middleware/check-auth');


router.get('/', userController.GetUsers);
// router.get('/details', userController.UserDetails);
router.post('/create', checkAuth, userController.CreateUser);
router.post('/authentication', userController.UserLogin);

module.exports = router;