const express = require('express')
const router = express.Router()
const PlayerController = require('../controllers/player')

router.post('/signup', PlayerController.signup)

module.exports = router