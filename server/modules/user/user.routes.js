import express from 'express';
import userController from './user.controller.js'
import multerFile from '../../middleware/multerfile.js';
// import multerImage from '../../middleware/multerimage.js';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/completeCenter/:center_id', multerFile("center_auth") ,userController.completeCenter);
router.post('/completeResponsible', userController.completeResponsible);
router.put('/center/:center_id', userController.editCenter);

router.put('/responsible/:user_id', userController.editResponsible);
router.put('/user/:id', userController.editUserUser);
router.put('/user/:user_id/validate', multerFile("file") , userController.ResponsibleValidateDocument);


export default router;