const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const dashboardController = require('../controllers/dashboardController');
const eventsController = require('../controllers/eventsController');

router.get('/view', userController.view);
router.post('/view', userController.find);
// router.get('/fileupload', userController.fileupload);
// router.post('/fileupload', userController.fileuploadfunc);
router.get('/adduser', userController.form);
router.post('/adduser', userController.create);
router.get('/edituser/:id', userController.edit);
router.post('/edituser/:id', userController.update);
router.get('/viewuser/:id', userController.viewall);

router.get('/dashboard', dashboardController.dashboard);

router.get('/events', eventsController.events);


// router.get('/:id', userController.delete);
module.exports = router;