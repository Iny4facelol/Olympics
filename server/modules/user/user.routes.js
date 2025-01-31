import express from 'express';
import userController from './user.controller.js'
import multerFile from '../../middleware/multerfile.js';
import multerImg from '../../middleware/multerImg.js';
import { tokenVerify } from '../../middleware/verifyToken.js';

const router = express.Router();

// Rutas de Usuarios
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/findUserByEmail', userController.findUserByEmail);
router.get('/findUserById', tokenVerify, userController.findUserById);
router.get("/userActivities/:user_id/:olympics_id", userController.getUserActivities)
router.get("/details/:user_id", userController.userDetails);
router.put('/editResponsible/:user_id', multerImg("activity_image") ,userController.editResponsible);
router.put('/completeResponsible/:user_id', userController.completeResponsible);
router.put('/editUser/:user_id', userController.editUserUser);
router.put('/restorePassword/:user_id', userController.restorePassword);
router.post('/loginWithGoogle', userController.loginWithGoogle);

// Rutas de Actividades
router.get('/usersToAddActivity/:user_center_id', userController.getUsersToAddActivity)
router.get("/activitiesFromOlympics/:olympics_id" , userController.getActivitiesFromOlympics)
router.post("/addActivityToUser/:user_id", userController.addActivityToUser)
router.post("/activities/:user_id", userController.addActivityToUser);

// Rutas de Centros
router.put('/completeCenter/:center_id', multerFile("center_auth") ,userController.completeCenter);

// Rutas de Validaciones y Autorizaciones
router.put('/authUser/:user_id', userController.ResponsibleValidateDocument);
router.put("/validateRegistrationUser/:validationToken" , userController.validateRegistrationUser)
router.put('/upload-authorization/:user_id',multerFile("authorization"),userController.uploadAuthorizationFile);
router.get("/authorization-file/:user_id", userController.getAuthorizationFile);
  // Ruta de alumnos pendientes de validación
router.get('/pendingValidationUsers/:user_center_id', userController.getPendingValidationUsers);
  // Ruta de perfil usuario no autorizado
router.get('/NonAuthProfile/:user_id', userController.getUnauthorizedUserProfile);














export default router;