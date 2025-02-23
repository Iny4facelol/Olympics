import express from 'express';
import adminController from './admin.controller.js'
import multerImage from '../../middleware/multerImg.js';
import multerFile from '../../middleware/multerfile.js';

const router = express.Router();

// Rutas del Centros
router.post('/addCenter', adminController.addCenter);
router.put('/logicalDeleteCenter/:center_id', adminController.deleteCenter);
router.put('/editCenter', multerFile("file"), adminController.editCenter);
router.get("/allCenters", adminController.allCenters);
router.get('/centers/verifyToken/:token', adminController.verifyToken);

// Rutas de Olimpiadas
router.post('/addOlympics', adminController.addOlympics);
router.post('/addOlympicsToCenter/:center_id', adminController.addOlympicsToCenter);
router.put('/editOlympics', adminController.editOlympics);
router.put('/logicalDeleteOlympics/:olympics_id', adminController.logicalDeleteOlympics);
router.get('/allOlympics', adminController.allOlympics);
router.get('/showActivitysInOlympics/:olympics_id', adminController.getOlympicsWithActivity);
router.get("/olympicsActivities/:olympics_id", adminController.getOlympicsActivities);
router.get("/centerOlympics/:center_id", adminController.getCenterOlympics);

// Rutas de Usuarios
router.post('/addResponsible', adminController.addResponsible);
router.post('/contactUs', adminController.contactUs);
router.put('/editResponsible', adminController.editResponsible);
router.put('/editUser', adminController.editUser); 
router.put('/delete-user/:user_id', adminController.deleteUserLogically);
router.get('/verifyTokenUser/:token', adminController.verifyTokenUser);
router.get('/allResponsibles', adminController.getResponsibles);
router.get('/allUser', adminController.allUser);
router.get('/searchUsers', adminController.searchUsers);

// Rutas de Actividades
router.post('/addActivity', multerImage("activity_image") ,adminController.addActivity);
router.post('/activity/:olympics_id', adminController.addActivityOlimpics);
router.put('/editActivity', multerImage("activity_image"), adminController.editActivity);
router.get('/allActivity', adminController.allActivity);
router.put('/logicalDeleteActivity/:activity_id', adminController.logicalDeleteActivity);

export default router;