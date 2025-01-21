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

// Rutas de Olimpiadas
router.post('/addOlympics', adminController.addOlympics);
router.put('/editOlympics', adminController.editOlympics);
router.get('/allOlympics', adminController.allOlympics);

// Rutas de Usuarios
router.post('/addResponsible', adminController.addResponsible);
router.put('/completeResponsible/:id', adminController.completeResponsible);
router.get('/verifyTokenResponsible/:token', adminController.verifyTokenResponsible);
router.put('/user/:id', adminController.editUser); //  revisar (no hace falta id por params)
router.get('/allResponsibles', adminController.getResponsibles);
router.get('/allUser', adminController.allUser);

// Rutas de Actividades
router.post('/addActivity', multerImage("activity_image") ,adminController.addActivity);
router.put('/editActivity', multerImage("activity"), adminController.editActivity);
router.get('/allActivity', adminController.allActivity);

export default router;