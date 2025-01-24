import { comparePassword, hashPassword } from "../../utils/hashUtils.js";
import { generateToken, getIdFromToken } from "../../utils/tokenUtils.js";
import {
  registerSchema,
  completeResponsibleSchema,
  editUserSchema,
} from "../../utils/zodSchemas/userSchema.js";
import { z } from "zod";
import userDal from "./user.dal.js";
import { loginSchema } from "../../../client/src/utils/zodSchemas/loginSchema.js";
import emailService from "../../utils/emailUtils/emailService.js";
import jwt from "jsonwebtoken";
import path from "path";
import { completeCenterSchema } from "../../utils/zodSchemas/centerSchema.js";

class UserController {
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

      console.log("EL RESULT", result);

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
          const token = generateToken(user.user_id);
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

  editResponsible = async (req, res) => {
    try {
      const { user_id } = req.params;
      const { user_name, user_lastname, user_phone, user_dni } = req.body;

      const result = await userDal.updateResponsible(user_id, {
        user_name,
        user_lastname,
        user_phone,
        user_dni,
      });

      return res.status(200).json({
        message: "Responsable actualizado con éxito.",
        result,
      });
    } catch (error) {
      console.error("Error en editResponsible:", error);
      return res.status(500).json({
        message: "Error al actualizar responsable.",
        error: error.message,
      });
    }
  };

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
  //REVISADO CON SANTI
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

  //REVISADO CON SANTI
  addActivityToUser = async (req, res) => {
    try {
      const { user_id } = req.params;
      const { activity_id, center_id, olympics_id } = req.body;

      console.log("Body:", req.body);
      console.log("Params:", req.params);

      if (!user_id || !activity_id || !center_id || !olympics_id) {
        return res.status(400).json({
          message:
            "Todos los campos son requeridos: user_id, activity_id, center_id, olympics_id",
        });
      }

      // Este bloque simula la inserción
      const result = {
        user_id,
        activity_id,
        center_id,
        olympics_id,
        message: "Actividad añadida al usuario con éxito.",
      };

      return res.status(200).json(result);
    } catch (error) {
      console.log("Error al añadir actividad al usuario:", error);
      return res
        .status(500)
        .json({ message: "Error al añadir actividad al usuario.", error });
    }
  };

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
      return res
        .status(500)
        .json({
          message: "Error al obtener usuarios pendientes de validar.",
          error,
        });
    }
  };

  getUnauthorizedUserProfile = async (req, res) => {
    try {
      const { user_id } = req.params;
      console.log("user_id", user_id);

      if (!user_id) {
        return res
          .status(400)
          .json({ message: "El id del usuario es requerido" });
      }

      const user = await userDal.getUnauthorizedUserById(user_id);
      console.log("user", user);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const userProfile = {
        user_id: user.user_id,
        name: user.user_name,
        authorized: user.user_is_auth,
      };

      console.log("userProfile", userProfile);

      return res.status(200).json(userProfile);
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
      return res
        .status(500)
        .json({ message: "Error al obtener el perfil del usuario", error });
    }
  };

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

  uploadAuthorizationFile = async (req, res) => {
    try {
      if (!req.file) {
        console.error("No se ha recibido ningún archivo.");
        res.status(400).json({
          message: "No se ha recibido ningún archivo.",
        });
      } else {
        await userDal.saveUserPermissionFile(req.params.user_id, req.file.filename, `/files/authorization/${req.file.filename}`);
  
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

  getAuthorizationFile = async (req, res) => {
    try {
      const user_id = req.params.user_id;

      const userFileName = await userDal.getAuthorizationFileFromDB(user_id);
  
      if (!userFileName) {
        res.status(404).json({
          message: "El archivo de autorización no se encuentra",
        });
      } else {
        const filePath = path.resolve(`./public/files/file/${userFileName}`);
  
        res.download(filePath, userFileName, (err) => {
          if (err) {
            console.error("Error al intentar descargar el archivo:", err);
            res.status(500).json({
              message: "Error al intentar descargar el archivo.",
            });
          }
        });
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



}


export default new UserController();
