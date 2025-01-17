import express from 'express';
import adminController from './admin.controller.js'

const router = express.Router();

router.post('/addCenter', adminController.addCenter);
router.post('/addOlympics', adminController.addOlympics);
router.post('/addActivity', adminController.addActivity);
router.post('/addResponsible', adminController.addResponsible);
router.get('/responsibles', adminController.getResponsibles);
router.get('/allOlympics', adminController.allOlympics);
router.get('/allActivity', adminController.allActivity);



export default router;