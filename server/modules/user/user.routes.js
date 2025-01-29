import express from 'express';
import userController from './user.controller.js'
import multerFile from '../../middleware/multerfile.js';
import multerImg from '../../middleware/multerImg.js';
import { tokenVerify } from '../../middleware/verifyToken.js';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/findUserById', tokenVerify, userController.findUserById);

router.put('/completeCenter/:center_id', multerFile("center_auth") ,userController.completeCenter);
router.put('/completeResponsible/:user_id', userController.completeResponsible);
router.get('/usersToAddActivity/:user_center_id', userController.getUsersToAddActivity)

router.put('/editResponsible/:user_id', multerImg("activity_image") ,userController.editResponsible);
router.put('/editUser/:user_id', userController.editUserUser);

router.put('/authUser/:user_id', userController.ResponsibleValidateDocument);

router.get("/activitiesFromOlympics/:olympics_id" , userController.getActivitiesFromOlympics)

router.get("/userActivities/:user_id/:olympics_id", userController.getUserActivities)

//REVISAR CON LOS PROFES
router.post("/addActivityToUser/:user_id", userController.addActivityToUser)

router.put("/validateRegistrationUser/:validationToken" , userController.validateRegistrationUser)


router.get("/details/:user_id", userController.userDetails);


router.put('/upload-authorization/:user_id',multerFile("authorization"),userController.uploadAuthorizationFile);

router.get("/authorization-file/:user_id", userController.getAuthorizationFile);

router.post("/activities/:user_id", userController.addActivityToUser);


//ruta de alumnos pendientes de validacion
router.get('/pendingValidationUsers/:user_center_id', userController.getPendingValidationUsers);

//ruta de perfil usuario no autorizado
router.get('/NonAuthProfile/:user_id', userController.getUnauthorizedUserProfile);
router.post('/findUserByEmail', userController.findUserByEmail);
router.put('/restorePassword/:user_id', userController.restorePassword)


export default router;