import express from 'express';
import userController from './user.controller.js'
import multer from '../../middleware/multerfile.js';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/completeCenter/:center_id', userController.completeCenter);
router.put('/completeResponsible/:user_id', userController.completeResponsible);
router.put('/center/:center_id', userController.editCenter);

router.put('/responsible/:user_id', userController.editResponsible);
router.put('/user/:id', userController.editUserUser);
router.put('/user/:user_id/validate', multer("file") , userController.ResponsibleValidateDocument);
//REVISAR CON LOS PROFES
router.post('/user/:user_id/activities', userController.addActivityToUser);


export default router;