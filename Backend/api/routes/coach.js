const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const CoachController = require('../controllers/coach')

// route used to sign players to team
router.post('/sign-player', CoachController.signPlayer)


// route to retrieve all players without team.
router.post('/available-players', CoachController.available_players)


// route to remove player from team.
router.post('/release-player', CoachController.release_player)


module.exports = router