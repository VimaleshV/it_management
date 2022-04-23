const express = require('express');
const router = express.Router();
const auth = require('../../utility/auth');
const userController = require('../controllers/userController');
const dashboardController = require('../controllers/dashboardController');
const eventsController = require('../controllers/eventsController');
const loginController = require('../controllers/loginController');
const contactusController = require('../controllers/contactusController');
const scheduleController = require('../controllers/scheduleController');
const homeController = require('../controllers/homeController');
const documentController = require('../controllers/documentController');

router.get('/homepage', auth.isAuthorized, homeController.homepage);

router.get('/newuser', auth.isAuthorized, userController.newuser);
router.post('/onboarding', auth.isAuthorized, userController.onboarding);

router.get('/login', loginController.login);
router.post('/signup', loginController.signup);
router.post('/signin', auth.isAuthorized, loginController.signin);
router.get('/logout', loginController.logout);

router.get('/view', auth.isAuthorized, userController.view);
router.post('/view', auth.isAuthorized, userController.find);
// router.get('/fileupload', userController.fileupload);
// router.post('/fileupload', userController.fileuploadfunc);
router.get('/adduser', auth.isAuthorized, userController.form);
router.post('/adduser', auth.isAuthorized, userController.create);
router.get('/edituser/:id', auth.isAuthorized, userController.edit);
router.post('/edituser/:id', auth.isAuthorized, userController.update);
router.get('/viewuser/:id', auth.isAuthorized, userController.viewall);

router.get('/dashboard', auth.isAuthorized, dashboardController.dashboard);

router.get('/events', auth.isAuthorized, eventsController.events);

router.get('/schedule', auth.isAuthorized, scheduleController.schedule);
router.post('/schedule', auth.isAuthorized, eventsController.schedule);
// router.post('/view-events', eventsController.viewevents);

router.get('/contactus', auth.isAuthorized, contactusController.contactus);

router.get('/payslipHtml', auth.isAuthorized, documentController.payslipHtml);
router.get('/generateHtmlPdf', auth.isAuthorized, documentController.generateHtmlPdf);

// router.get('/:id', userController.delete);
module.exports = router;