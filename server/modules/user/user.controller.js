import userDal from "./user.dal.js";
import emailService from "../../utils/emailUtils/emailService.js";
import jwt from "jsonwebtoken";
import path from "path";
import { comparePassword, hashPassword } from "../../utils/hashUtils.js";
import { generateToken, getIdFromToken } from "../../utils/tokenUtils.js";
import { z } from "zod";
import { loginSchema } from "../../../client/src/utils/zodSchemas/loginSchema.js";
import { completeCenterSchema } from "../../utils/zodSchemas/centerSchema.js";
import {
registerSchema,
completeResponsibleSchema,
  editUserSchema,
  editResponsibleSchema,
  emailSchema,
  passwordSchema,
} from "../../utils/zodSchemas/userSchema.js";

import admin from "firebase-admin";

class UserController {
  // 1º Apartado de Usuarios
    // Registro de usuario

  register = async (req, res) => {
    const parsedData = registerSchema.parse(req.body);

    try {
      const {
        user_name,
        user_lastname,
        user_tutor_name,
        user_tutor_lastname,
        user_dni,
        user_city,
        user_address,
        user_phone,
        user_birth_date,
        user_email,
        user_password,
        user_center_id,
      } = parsedData;

      const hash = await hashPassword(user_password);

      const values = [
        user_name,
        user_lastname,
        user_tutor_name,
        user_tutor_lastname,
        user_dni,
        user_city,
        user_address,
        user_phone,
        user_birth_date,
        user_email,
        hash,
        user_center_id,
      ];

      const result = await userDal.register(values);

      const token = jwt.sign(
        { user_id: result.insertId },
        process.env.TOKEN_KEY,
        { expiresIn: "24h" }
      );

      await emailService.sendValidationEmail(parsedData, token);

      return res.status(200).json({ msg: "Usuario registrado correctamente" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  };

    // Login de Usuario

  login = async (req, res) => {
    const parsedData = loginSchema.parse(req.body);
    const { user_email, user_password } = parsedData;

    try {
      const result = await userDal.getUserByEmail(user_email);

      if (result.length === 0) {
        res.status(401).json({ emailError: "El email introducido no existe" });
      } else {
        const user = result[0];
        const match = await comparePassword(user_password, user.user_password);

        if (match) {
          const token = generateToken(user.user_id, user.user_type);
          res.status(200).json({ token, user });
        } else {
          res.status(401).json({ passwordError: "La contraseña no es válida" });
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ message: "Error en el servidor" });
      }
    }
  };

  //Login con Google
  loginWithGoogle = async (req, res) => {
    const { googleToken } = req.body;
  
    try {
      // Verificar el token de Google con Firebase
      const decodedToken = await admin.auth().verifyIdToken(googleToken);
      console.log("Decoded token:", decodedToken);
  
      const { email, uid } = decodedToken;
      console.log("Email extraído del token:", email);
  
      // Buscar usuario en la base de datos
      let user = await userDal.findUserByEmailGoogle(email);
      console.log("resultado de la consulta:", user);
  
      if (!user) {  // Corregido para manejar null correctamente
        return res.status(401).json({
          error: "Usuario no registrado o eliminado. Complete sus datos antes de iniciar sesión.",
        });
      }
  
      if (user.firebase_uid !== uid) {
        user = await userDal.updateFirebaseUid(user.user_id, uid); // Actualizamos el firebase_uid si no coincide
        if (!user) {
          return res.status(500).json({
            error: "No se pudo actualizar el firebase_uid del usuario.",
          });
        }
      }
  
      // Generar un token JWT para la sesión
      const token = jwt.sign(
        { user_id: user.user_id },
        process.env.TOKEN_KEY,
        { expiresIn: "24h" }
      );
  
      return res.json({
        message: "Inicio de sesión exitoso",
        token,
        user,
      });
  
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      return res.status(400).json({ error: "Token inválido o problema con la verificación" });
    }
  };

    // Buscar Usuario por ID

  findUserById = async (req, res) => {
    try {
      const user_id = getIdFromToken(req.token);
      const result = await userDal.findUserById(user_id);
      const userData = result[0];
      return res.status(200).json(userData);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

    // Completas Responsable 

  completeResponsible = async (req, res) => {
    const parsedData = completeResponsibleSchema.parse(req.body);
    try {
      const { user_name, user_lastname, user_dni, user_phone, user_password } =
        parsedData;

      const { user_id } = req.params;

      const hash = await hashPassword(user_password);

      const values = [
        user_name,
        user_lastname,
        user_dni,
        user_phone,
        hash,
        user_id,
      ];

      await userDal.completeResponsible(values);
      res.status(200).json({ msg: "Responsable completado con éxito." });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  };

    // Editar Responsable

  editResponsible = async (req, res) => {
    try {
      const { user_id } = req.params;
      const parsedData = editResponsibleSchema.parse(req.body);

      const result = await userDal.updateResponsible(user_id, parsedData);

      return res.status(200).json({
        message: "Responsable actualizado con éxito.",
        result,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      }
      console.error("Error en editResponsible:", error);
      return res.status(500).json({
        message: "Error al actualizar responsable.",
        error: error.message,
      });
    }
  };

    // Editar Usuario

  editUserUser = async (req, res) => {
    const parsedData = editUserSchema.parse(req.body);
    try {
      const { user_id } = req.params;
      const result = await userDal.updateUserUser(user_id, parsedData);
      return res
        .status(200)
        .json({ message: "Usuario actualizado con éxito.", result });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        throw error;
      }
    }
  };

    //LISTADO PARA VER (EL RESPONSABLE, USER TYPE =2) ALUMNOS Y POSTERIORMENTE ASIGNAR ACTIVIDADES

  getUsersToAddActivity = async (req, res) => {
    try {
      const { user_center_id } = req.params;

      const result = await userDal.getUsersToAddActivity(user_center_id);
      return res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

    // Añadir actividad a Usuario

  addActivityToUser = async (req, res) => {
    try {
      const { user_id } = req.params;
      const { activity_id, center_id, olympics_id } = req.body;

      if (!user_id || !activity_id || !center_id || !olympics_id) {
        return res.status(400).json({
          message:
            "Todos los campos son requeridos: user_id, activity_id, center_id, olympics_id",
        });
      }

      const result = await userDal.addActivityToUser(
        user_id,
        activity_id,
        center_id,
        olympics_id
      );

      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al añadir actividad al usuario.", error });
    }
  };

    // Detalles de Usuario

  userDetails = async (req, res) => {
    try {
      const { user_id } = req.params;
      const result = await userDal.searchUserDetails(user_id);

      res.status(200).json(result);
    } catch (error) {
      console.error("Error al obtener los detalles del usuario", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };

    // Restaurar Contraseña de Usuario

  restorePassword = async (req, res) => {
    const parsedData = passwordSchema.parse(req.body);
    try {
      const { user_password } = parsedData;
      const { user_id } = req.params;
      const hash = await hashPassword(user_password);
      await userDal.updatePassword(hash, user_id);
      res.status(200).json({ msg: "Contraseña actualizada con éxito."})
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(400).json({ message: error.message })
      }
    }
  }

  // 2º Apartado de Actividades
    // Ver Actividades de un Usuario

  getUserActivities = async (req, res) => {
    try {
      const { user_id, olympics_id } = req.params;

      if (!user_id || !olympics_id) {
        return res
          .status(400)
          .json({ message: "El id del usuario y el id de las olimpiadas son requeridos" });
      }

      const userActivities = await userDal.getUserActivities(user_id, olympics_id);

      return res.status(200).json(userActivities);
    } catch (error) {
      console.error("Error al obtener las actividades del usuario:", error);
      return res.status(500).json({
        message: "Error al obtener las actividades del usuario.",
        error,
      });
    }
  }

    // Ver Actividades de una Olimpiada

  getActivitiesFromOlympics = async (req, res) => {
    try {
      const { olympics_id } = req.params;
      console.log("olympics_id", olympics_id);
      const result = await userDal.getActivitiesFromOlympics(olympics_id);

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        "Error al obtener las actividades de las olimpiadas:",
        error
      );
      return res.status(500).json({
        message: "Error al obtener las actividades de las olimpiadas.",
        error,
      });
    }
  };

  // 3º Apartado Centro
    // Completar Centro

  completeCenter = async (req, res) => {
    const parsedData = completeCenterSchema.parse(req.body);

    try {
      const { center_city, center_province, center_address, center_phone } =
        parsedData;

      const { filename } = req.file;
      const center_auth_doc = filename;

      const { center_id } = req.params;

      const result = await userDal.completeCenter({
        center_id,
        center_city,
        center_province,
        center_address,
        center_phone,
        center_auth_doc,
      });

      return res.status(200).json({ message: "Centro completado con éxito." });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        console.log(error);
        return res.status(400).json({ message: error.message });
      }
    }
  };

  // 4º Apartado de Validaciones
    // Validar documento desde Responsable

  ResponsibleValidateDocument = async (req, res) => {
    try {
      const { user_id } = req.params;

      const result = await userDal.updateDocumentValidation(user_id);

      res
        .status(200)
        .json({ message: "Documento validado con éxito.", result });
    } catch (error) {
      res.status(500).json({ error });
    }
  };

    // Validar Registro de Usuario

  validateRegistrationUser = async (req, res) => {
    try {
      const { validationToken } = req.params;

      const user_id = getIdFromToken(validationToken);

      const result = await userDal.validateRegistrationUser(user_id);

      res.status(200).json({ message: "Usuario validado con éxito.", result });
    } catch (error) {
      res.status(500).json({ error });
    }
  };

    // Validación pendiente 

  getPendingValidationUsers = async (req, res) => {
    try {
      const { user_center_id } = req.params;
      console.log("user_center_id: Recibido", user_center_id);

      const pendingUsers = await userDal.getPendingValidationUsers(
        user_center_id
      );

      return res.status(200).json(pendingUsers);
    } catch (error) {
      console.error("Error al obtener usuarios pendientes de validar:", error);
      return res.status(500).json({
        message: "Error al obtener usuarios pendientes de validar.",
        error,
      });
    }
  };

    // Obtener la validación 

  getUnauthorizedUserProfile = async (req, res) => {
    try {
      const { user_id } = req.params;

      if (!user_id) {
        return res
          .status(400)
          .json({ message: "El id del usuario es requerido" });
      }

      const user = await userDal.getUnauthorizedUserById(user_id);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const userProfile = {
        user_id: user.user_id,
        name: user.user_name,
        authorized: user.user_is_auth,
      };

      return res.status(200).json(userProfile);
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
      return res
        .status(500)
        .json({ message: "Error al obtener el perfil del usuario", error });
    }
  };

    // Subir la validación

  uploadAuthorizationFile = async (req, res) => {
    try {
      if (!req.file) {
        console.error("No se ha recibido ningún archivo.");
        res.status(400).json({
          message: "No se ha recibido ningún archivo.",
        });
      } else {
        await userDal.saveUserPermissionFile(
          req.params.user_id,
          req.file.filename,
        );

        res.status(200).json({
          message: "Archivo subido correctamente.",
          fileName: req.file.filename,
        });
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      res.status(500).json({
        message: "Error al procesar la solicitud.",
        error: error.message,
      });
    }
    return;
  };

    // Descargar la Validación

  getAuthorizationFile = async (req, res) => {
    try {
      const user_id = req.params.user_id;

      const userFileName = await userDal.getAuthorizationFileFromDB(user_id);

      if (!userFileName) {
        res.status(404).json({
          message: "El archivo de autorización no se encuentra",
        });
      } else {
        res.status(200).json({userFileName})
      }
    } catch (error) {
      console.error("Error en getAuthorizationFile:", error);
      res.status(500).json({
        message: "Error al procesar la solicitud.",
        error: error.message,
      });
    }
    return;
  };

  findUserByEmail = async (req, res) => {
    const parsedData = emailSchema.parse(req.body);
    const { user_email } = parsedData;
    try {      
      const result = await userDal.getUserByEmail(user_email);
      
      if (result.length === 0) {
        res.status(401).json({ emailError: "El email introducido no existe" });
      } else {        
        const token = jwt.sign(
          { user_id: result[0].user_id },
          process.env.TOKEN_KEY,
          { expiresIn: "24h" }
        );        
        await emailService.sendResetPasswordEmail(parsedData, token);
      }
      
      return res.status(201).json({
        message: "Token creado",
        insertId: result[0].user_id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ msg: "Error al hacer petición ", error });
      }
    }
  };
}

export default new UserController();
