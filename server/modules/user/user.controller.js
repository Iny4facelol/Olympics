import { comparePassword, hashPassword } from "../../utils/hashUtils.js";
import { generateToken, getIdFromToken } from "../../utils/tokenUtils.js";
import { completeResponsibleSchema } from "../../utils/zodSchemas/completeResponsibleSchema.js";
import { registerSchema } from "../../utils/zodSchemas/registerSchema.js";
import { z } from "zod";
import userDal from "./user.dal.js";

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

      // Validación de campos

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
      };
    };
  };

  login = async (req, res) => {
    const { user_email, user_password } = req.body;

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
        };
      };
    } catch (error) {
      res.status(500).json({ message: "Error en el servidor" });
    }
  };

  completeCenter = async (req, res) => {
    try {
      const {
        center_city,
        center_province,
        center_address,
        center_phone,
      } = req.body;

      const { filename } = req.file;
      const center_auth_doc = filename;

      const { center_id } = req.params;

      if (
        !center_city ||
        !center_province ||
        !center_address ||
        !center_phone ||
        !center_auth_doc
      ) {
        throw new Error(
          "Todos los campos son requeridos para completar el centro."
        );
      }

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
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  };

  completeResponsible = async (req, res) => {
    const parsedData = completeResponsibleSchema.parse(req.body);

    try {
      const {
        user_name,
        user_lastname,
        user_dni,
        user_phone,
        user_password,        
      } = parsedData;

      const { user_id } = req.params;

      const hash = await hashPassword(user_password);

      const values = [user_name, user_lastname, user_dni, user_phone, hash, user_id];

      await userDal.completeResponsible(values);      
      res.status(200).json({ msg: "Responsable completado con éxito." });
    } catch (error) {

      if (error instanceof z.ZodError){
        res.status(400).json({ error: error.errors });
      } else {
        res.status(400).json({ message: error.message });
      };
    };
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
      return res
        .status(500)
        .json({
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
      return res
        .status(500)
        .json({
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
        return res
          .status(400)
          .json({
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

  ResponsibleValidateDocument = async (req, res) => {
    try {
      const { user_id } = req.params;
      const { user_is_validated } = req.body;
      const documento = req.file; // Archivo subido

      if (!user_id || user_is_validated === undefined) {
        return res
          .status(400)
          .json({
            message:
              "El ID del usuario y el estado de validación son requeridos.",
          });
      }

      if (!documento) {
        return res.status(400).json({ message: "El documento es requerido." });
      }

      const result = await userDal.updateDocumentValidation(
        user_id,
        user_is_validated
      );

    ///REVISAR CON LOS PROFES

    addActivityToUser = (req, res) => {
    const { user_id } = req.params;
    const { activity_id, center_id, olympics_id } = req.body;

    console.log("Body:", req.body);
    console.log("Params:", req.params);

    // Validar los datos recibidos
    if (!user_id || !activity_id || !center_id || !olympics_id) {
      return res.status(400).json({
        message: 'Todos los campos son requeridos: user_id, activity_id, center_id, olympics_id',
      });
    }

    // Simulación de inserción en la base de datos
    const result = {
      user_id,
      activity_id,
      center_id,
      olympics_id,
      message: 'Actividad añadida al usuario con éxito.',
    };

    return res.status(200).json(result);
  };
      return res
        .status(200)
        .json({ message: "Documento validado con éxito.", result });
    } catch (error) {
      console.log("Error al validar documento:", error);
      return res
        .status(500)
        .json({ message: "Error al validar documento.", error });
    }
  };
}

export default new UserController();
