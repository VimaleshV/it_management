const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/eventsController');

router.post('/events', eventsController.events);
router.post('/schedule', eventsController.schedule);

