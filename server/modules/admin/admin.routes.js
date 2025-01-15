import express from 'express';
import adminController from './admin.controller.js'

const router = express.Router();

router.post('/addCenter', adminController.addCenter);
router.post('/addOlympics', adminController.addOlympics);




export default router;