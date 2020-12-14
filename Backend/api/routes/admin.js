const express = require('express')
const router = express.Router();
const AdminController = require('../controllers/admin')
const checkAuth = require('../middleware/check-auth')


// Admin route for creating new team
router.post('/create-team', checkAuth, AdminController.create_team);

// Admin route to add a new Coach
router.post('/add-coach', checkAuth, AdminController.add_coach);

module.exports = router;