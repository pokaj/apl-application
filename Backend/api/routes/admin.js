const express = require('express')
const router = express.Router();
const AdminController = require('../controllers/admin')
const checkAdmin = require('../middleware/check-admin')


// Admin route for creating new team
router.post('/create-team', checkAdmin, AdminController.create_team);

// Admin route to update coach of team
router.post('/update-coach', checkAdmin, AdminController.update_coach);

// Admin route to add add league fixtures
router.post('/add-fixtures', AdminController.add_fixtures);


module.exports = router;