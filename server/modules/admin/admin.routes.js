import express from 'express';
import adminController from './admin.controller.js'
import multerImage from '../../middleware/multerImg.js';
import multerFile from '../../middleware/multerfile.js';

const router = express.Router();

router.post('/addCenter', adminController.addCenter);
router.post('/addOlympics', adminController.addOlympics);
router.post('/addActivity', multerImage("activity_image") ,adminController.addActivity);
router.post('/addResponsible', adminController.addResponsible);
router.get('/allResponsibles', adminController.getResponsibles);
router.get('/centers/verifyToken/:token', adminController.verifyToken);
router.get('/allOlympics', adminController.allOlympics);
router.get('/allActivity', adminController.allActivity);
router.get('/allUser', adminController.allUser);
router.put('/editOlympics', adminController.editOlympics);
router.put('/editActivity', multerImage("activity"), adminController.editActivity);
router.put('/editCenter', multerFile("file"), adminController.editCenter);
router.put('/user/:id', adminController.editUser); //  revisar (no hace falta id por params)
router.get("/allCenters", adminController.allCenters);


export default router;