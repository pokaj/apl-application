const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')

// route for signing up
router.post('/signup', UserController.signup)

// route for logging in
router.post('/login', UserController.login);


module.exports = router;