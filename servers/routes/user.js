const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const dashboardController = require('../controllers/dashboardController');
const eventsController = require('../controllers/eventsController');
const loginController = require('../controllers/loginController');
const contactusController = require('../controllers/contactusController');
const scheduleController = require('../controllers/scheduleController');

router.get('/login', loginController.login);
router.post('/signup', loginController.signup);

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

router.get('/schedule', scheduleController.schedule);
router.post('/schedule', eventsController.schedule);
// router.post('/view-events', eventsController.viewevents);

router.get('/contactus', contactusController.contactus);


router.get('/:id', userController.delete);
module.exports = router;