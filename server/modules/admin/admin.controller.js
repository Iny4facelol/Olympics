import adminDal from "./admin.dal.js";
import jwt from "jsonwebtoken";
import emailService from "../../utils/emailUtils/emailService.js";
import { regResponsibleSchema } from "../../utils/zodSchemas/regResponsibleSchema.js";

import { completeResponsibleSchema } from "../../utils/zodSchemas/completeResponsibleSchema.js";

import { olympicsSchema } from "../../utils/zodSchemas/olympicsSchema.js";
import { z } from "zod";
import { createCenterSchema } from "../../utils/zodSchemas/createCenterSchema.js";
import { activitySchema } from "../../utils/zodSchemas/activitySchema.js";


class AdminController {
  // 1º Apartado de Olimpiadas
  // Añadir Olimpiada

  addOlympics = async (req, res) => {
    const parsedData = olympicsSchema.parse(req.body);

    try {
      const result = await adminDal.addOlympics(parsedData);
      return res.status(201).json({
        message: "olimpiada creada con éxito",
        olympics_id: result.insertId,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ msg: "Error al crear las olimpiadas" });
      }
    }
  };

  // Ver todas las Olimpiadas

  allOlympics = async (req, res) => {
    try {
      let result = await adminDal.allOlympics();

      return res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  // Editar Olimpiada

  editOlympics = async (req, res) => {
    const parsedData = olympicsSchema.parse(req.body)
    const { olympics_id } = req.body
    try {  
      const result = await adminDal.editOlympics(parsedData, olympics_id);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof z.ZodError){
        res.status(400).json({ error: error.errors })
      }else{
        res.status(500).json(error);
      }
    }
  };

  // 2º Apartado de Centro
  // Añadir un Centro

  addCenter = async (req, res) => {
    const parsedData = createCenterSchema.parse(req.body);

    try {
      const result = await adminDal.createCenter(parsedData);
      const token = jwt.sign(
        { center_id: result.insertId },
        process.env.TOKEN_KEY,
        { expiresIn: "24h" }
      );

      await emailService.sendRegistrationEmail(parsedData, token);

      return res.status(201).json({
        message: "Centro creado con éxito",
        centerId: result.insertId,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        console.error(error);
        return res.status(500).json({ message: "Error al crear el centro" });
      }
    }
  };

  // Ver todos los Centros

  allCenters = async (req, res) => {
    try {
      const centers = await adminDal.getAllCenters();

      res.status(200).json(centers);
    } catch (error) {
      console.error("Error en allCenters:", error);
      res.status(500).json({ message: "Error al obtener los centros." });
    }
  };

  // Editar Centro

  editCenter = async (req, res) => {
    try {
      let data = req.body;
      let file = null;
      if (req.file) {
        file = req.file.filename;
      }

      const result = await adminDal.editCenter(data, file);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  // 3º Apartado de Usuarios
  // Añadir Responsable user_type = 2

  addResponsible = async (req, res) => {
    const parsedData = regResponsibleSchema.parse(req.body);

    try {
      const { user_name, user_email, user_center_id } = parsedData;
      const values = { user_name, user_email, user_center_id };
      const result = await adminDal.addResponsible(values);

      const token = jwt.sign(
        { user_id: result.insertId },
        process.env.TOKEN_KEY,
        { expiresIn: "24h" }
      );

      await emailService.sendRegistrationResponsableEmail(parsedData, token);

      return res.status(201).json({
        message: "Responsable creado con éxito",
        userId: result.insertId,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ msg: "Error al registrar responsable", error });
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
  }

  // Ver los Responsables user_type = 2 (Recordar Duda)

  getResponsibles = async (req, res) => {
    try {
      const responsibles = await adminDal.getAll();
      res.status(200).json(responsibles);
    } catch (error) {
      res.status(500).json({ msg: "Error al obtener responsables", error });
    }
  };

  // Editar Usuario type_user = 1

  editUser = async (req, res) => {
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
        user_birth_date,
        user_phone,
        user_type,
        user_center_id,
        user_olympics_id,
      } = req.body;

      const result = await adminDal.updateUser(id, {
        user_name,
        user_lastname,
        user_tutor_name,
        user_tutor_lastname,
        user_dni,
        user_city,
        user_address,
        user_birth_date,
        user_phone,
        user_type,
        user_center_id,
        user_olympics_id,
      });

      return res
        .status(200)
        .json({ message: "Usuario actualizado con éxito.", result });
    } catch (error) {
      console.error("Error en editUser:", error.message);
      return res.status(500).json({
        message: "Error al actualizar usuario.",
        error: error.message,
      });
    }
  };

  // Ver todos los Usuarios

  allUser = async (req, res) => {
    try {
      let result = await adminDal.allUser();
      return res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  // 4º Apartado de Actividades
    // Añadir una Actividad

  addActivity = async (req, res) => {
    const { activity_name, activity_description, max_participants } = req.body;

    const img = req.file.filename;

    const max_participants_number = parseInt(max_participants);
    const values = {
      activity_name,
      activity_description,
      max_participants_number,
      img,
    };

    try {
      const parsedData = activitySchema.parse(values);

      const result = await adminDal.addActivity(parsedData);

      return res.status(201).json({
        message: "actividad creada",
        activity_id: result.insertId,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ msg: "Error al crear actividad" });
      }
    }
  };

    // Ver todas las Actividades

  allActivity = async (req, res) => {
    try {
      let result = await adminDal.allActivity();
      return res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  };

    // Editar Actividad

  editActivity = async (req, res) => {
    const { activity_name, activity_description, max_participants, activity_id } = req.body;
    const img = req.file.filename;

    const max_participants_number = parseInt(max_participants);
    const values = {
      activity_name,
      activity_description,
      max_participants_number,
      img,
    };
    
    try {
      const parsedData = activitySchema.parse(values);
      const result = await adminDal.editActivity(parsedData, activity_id);

      res.status(200).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json(error);
      }
    }
  };

    // Añadir Actividad a Olimpiada

  addActivityOlimpics = async (req, res) => {
    try {
      const { olympics_id } = req.params;
      const { activity_id } = req.body;
  
      const result = await AdminDal.saveActivity(olympics_id, activity_id);
  
      res.status(200).json({ message: "Actividad añadida a la olimpiada", result });
    } catch (error) {
      console.log('Error al añadir la actividad', error);
      res.status(500).json({ message: "Error al añadir la actividad.", error: error.message });
    }
  };

  // TOKEN

  verifyToken = async (req, res) => {
    try {
      const { token } = req.params;
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      const center = await adminDal.getCenterById(decoded.center_id);

      if (!center) {
        return res.status(404).json({ message: "Centro no encontrado" });
      }

      res.status(200).json({ center_id: center[0].center_id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al buscar el centro" });
    }
  };


  verifyTokenResponsible = async (req, res) => {
    try {
      const { token } = req.params;
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      const user = await adminDal.getUserById(decoded.user_id);

      if(!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }


      res.status(200).json({ user_id: user[0].user_id, user_name : user[0].user_name });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al buscar el usuario" });
    }
  }
}



export default new AdminController();
