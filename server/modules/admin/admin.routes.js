import express from 'express';
import adminController from './admin.controller.js'
import multerImage from '../../middleware/multerImg.js';
import multerFile from '../../middleware/multerfile.js';

const router = express.Router();

// Rutas del Centros
router.post('/addCenter', adminController.addCenter);
router.put('/editCenter', multerFile("file"), adminController.editCenter);
router.get("/allCenters", adminController.allCenters);
router.get('/centers/verifyToken/:token', adminController.verifyToken);
router.put('/logicalDeleteCenter/:center_id', adminController.deleteCenter);

// Rutas de Olimpiadas
router.post('/addOlympics', adminController.addOlympics);
router.put('/editOlympics', adminController.editOlympics);
router.get('/allOlympics', adminController.allOlympics);
router.put('/logicalDeleteOlympics/:olympics_id', adminController.logicalDeleteOlympics);
router.get('/showActivitysInOlympics/:olympics_id', adminController.getOlympicsWithActivity);
router.get("/olympicsActivities/:olympics_id", adminController.getOlympicsActivities);

// Rutas de Usuarios
router.post('/addResponsible', adminController.addResponsible);
router.get('/verifyTokenResponsible/:token', adminController.verifyTokenResponsible);
router.get('/allResponsibles', adminController.getResponsibles);
router.get('/allUser', adminController.allUser);
router.put('/editUser', adminController.editUser); 
router.put('/editResponsible', adminController.editResponsible);
router.put('/delete-user/:user_id', adminController.deleteUserLogically);
router.get('/searchUsers', adminController.searchUsers);

// Rutas de Actividades
router.post('/addActivity', multerImage("activity_image") ,adminController.addActivity);
router.put('/editActivity', multerImage("activity_image"), adminController.editActivity);
router.get('/allActivity', adminController.allActivity);
router.post('/activity/:olympics_id', adminController.addActivityOlimpics);
router.put('/logicalDeleteActivity/:activity_id', adminController.logicalDeleteActivity);

export default router;