const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController')
const checkAuth = require('../middleware/check-auth');


router.get('/', userController.GetUsers);
// router.get('/details', userController.UserDetails);
router.post('/create', checkAuth, userController.CreateUser);
router.post('/authentication', userController.UserLogin);
router.get('/verify-email', userController.VerifyEmail);

module.exports = router;