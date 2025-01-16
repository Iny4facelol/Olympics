import express from 'express';
import userController from './user.controller.js';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/completeCenter', userController.completeCenter);
router.post('/completeResponsible', userController.completeResponsible);


export default router;