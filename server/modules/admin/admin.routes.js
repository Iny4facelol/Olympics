import express from 'express';
import adminController from './admin.controller.js'

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
router.post('/editOlympics', adminController.editOlympics)
router.put('/user/:id', adminController.editUser);



export default router;