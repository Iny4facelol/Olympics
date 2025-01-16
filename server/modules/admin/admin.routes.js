import express from 'express';
import adminController from './admin.controller.js'

const router = express.Router();

router.post('/addCenter', adminController.addCenter);
router.post('/addOlympics', adminController.addOlympics);
router.post('/addActivity', adminController.addActivity);
router.post('/responsible/register', adminController.addResponsible);
router.get('/responsibles', adminController.getResponsibles);




export default router;