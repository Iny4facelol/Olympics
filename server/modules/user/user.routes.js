import express from 'express';
import userController from './user.controller.js'
import multerFile from '../../middleware/multerfile.js';
import uploadImage from "../../middleware/multerfile.js";
// import multerImage from '../../middleware/multerimage.js';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

router.put('/completeCenter/:center_id', multerFile("center_auth") ,userController.completeCenter);
router.put('/completeResponsible/:user_id', userController.completeResponsible);
router.get('/usersToAddActivity/:user_center_id', userController.getUsersToAddActivity)
router.put('/center/:center_id', userController.editCenter);

router.put('/responsible/:user_id', userController.editResponsible);
router.put('/:id', userController.editUserUser);

router.put('/validate/:user_id', userController.ResponsibleValidateDocument);


router.get("/details/:user_id", userController.userDetails);


router.put('/upload-authorization/:user_id',multerFile("authorization"),userController.uploadAuthorizationFile);

router.get('/get-authorization/:user_id', userController.getAuthorizationFile);

router.post("/activities/:user_id", userController.addActivityToUser);

//ruta de alumnos pendientes de validacion
router.get('/pendingValidationUsers/:user_center_id', userController.getPendingValidationUsers);

//ruta de perfil usuario no autorizado
router.get('/unAuthorizedProfile/:user_id', userController.getUnauthorizedUserProfile);


export default router;