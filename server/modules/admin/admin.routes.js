import express from 'express';
import adminController from './admin.controller.js'
import multer from '../../middleware/multerImg.js';

const router = express.Router();

router.post('/addCenter', adminController.addCenter);
router.post('/addOlympics', adminController.addOlympics);
router.post('/addActivity', adminController.addActivity);
router.post('/addResponsible', adminController.addResponsible);
router.get('/responsibles', adminController.getResponsibles);

router.get('/centers/verifyToken/:token', adminController.verifyToken);

router.get('/allOlympics', adminController.allOlympics);
router.get('/allActivity', adminController.allActivity);
router.get('/allUser', adminController.allUser);
router.put('/editOlympics', adminController.editOlympics);
router.put('/editActivity', multer("activity"), adminController.editActivity)



export default router;