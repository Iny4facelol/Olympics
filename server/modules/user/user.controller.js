import { comparePassword, hashPassword } from "../../utils/hashUtils.js";
import { generateToken, getIdFromToken } from "../../utils/tokenUtils.js";
import { completeResponsibleSchema } from "../../utils/zodSchemas/completeResponsibleSchema.js";
import { registerSchema } from "../../utils/zodSchemas/registerSchema.js";
import { z } from "zod";
import userDal from "./user.dal.js";
import { loginSchema } from "../../../client/src/utils/zodSchemas/loginSchema.js";
import { centerSchema } from "../../utils/zodSchemas/centerSchema.js";

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

      await userDal.register(values);
      res.status(200).json({ msg: "Usuario registrado correctamente" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  };

  login = async (req, res) => {
    const parsedData = loginSchema.parse(req.body)
    const { user_email, user_password } = parsedData;

    try {
      const result = await userDal.getUserByEmail(user_email);

      if (result.length === 0) {
        res.status(401).json({ message: "datos incorrectos" });
      } else {
        const user = result[0];
        const match = await comparePassword(user_password, user.user_password);

        if (match) {
          const token = generateToken(user.user_id);
          res.status(200).json({ token, user });
        } else {
          res.status(401).json({ message: "datos incorrectos" });
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError){
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ message: "Error en el servidor" });
      }
    }
  };

  completeCenter = async (req, res) => {
    const parsedData = centerSchema.parse(req.body)
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
      }else{
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

  editCenter = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        center_city,
        center_province,
        center_address,
        center_phone,
        center_auth_doc,
      } = req.body;

      if (
        !center_city ||
        !center_province ||
        !center_address ||
        !center_phone ||
        !center_auth_doc
      ) {
        throw new Error(
          "Todos los campos son requeridos para editar el centro."
        );
      }

      const result = await userDal.updateCenter(id, {
        center_city,
        center_province,
        center_address,
        center_phone,
        center_auth_doc,
      });

      return res
        .status(200)
        .json({ message: "Centro actualizado con éxito.", result });
    } catch (error) {
      return res.status(500).json({
        message: "Error al actualizar",
        error: error.message || error,
      });
    }
  };

  editUserUser = async (req, res) => {
    try {
      const { id } = req.params;
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
      } = req.body;

      if (
        !id ||
        !user_name ||
        !user_lastname ||
        !user_tutor_name ||
        !user_tutor_lastname ||
        !user_dni ||
        !user_city ||
        !user_address ||
        !user_phone ||
        !user_birth_date
      ) {
        return res.status(400).json({
          message: "Todos los campos son requeridos para editar el usuario.",
        });
      }

      const result = await userDal.updateUserUser(id, {
        user_name,
        user_lastname,
        user_tutor_name,
        user_tutor_lastname,
        user_dni,
        user_city,
        user_address,
        user_phone,
        user_birth_date,
      });

      return res
        .status(200)
        .json({ message: "Usuario actualizado con éxito.", result });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al actualizar usuario.", error });
    }
  };
//REVISADO CON SANTI
  ResponsibleValidateDocument = async (req, res) => {
    try {
      const { user_id } = req.params;
      
      const result = await userDal.updateDocumentValidation(
        user_id,
      );

      res
        .status(200)
        .json({ message: "Documento validado con éxito.", result });
    } catch (error) {
   
      res
        .status(500)
        .json({error });
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
  getPendingValidationUsers = async (req, res) => {
    try {
      const { user_center_id } = req.params;
      console.log("user_center_id: Recibido", user_center_id);
      
      const pendingUsers = await userDal.getPendingValidationUsers(user_center_id);

      return res.status(200).json(pendingUsers);
    } catch (error) {
      console.error("Error al obtener usuarios pendientes de validar:", error);
      return res.status(500).json({ message: "Error al obtener usuarios pendientes de validar.", error });
    }
  };

  

  getUnauthorizedUserProfile = async (req, res) => {
    try {
      const { user_id } = req.params;
      console.log("user_id", user_id);
      
      if (!user_id) {
        return res.status(400).json({ message: "El id del usuario es requerido" });
      }
  
      const user = await userDal.getUnauthorizedUserById(user_id);
        console.log('user', user);
  
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      const userProfile = {
        id: user.user_id,
        name: user.user_name,
        authorized: user.user_is_auth,
      };
  
      console.log("userProfile", userProfile);
      
      return res.status(200).json(userProfile);
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
      return res.status(500).json({ message: "Error al obtener el perfil del usuario", error });
    }
  };
  
  

}

export default new UserController();
