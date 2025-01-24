import adminDal from "./admin.dal.js";
import jwt from "jsonwebtoken";
import emailService from "../../utils/emailUtils/emailService.js";
import {
  editResponsibleSchema,
  editUserSchema,
  registerResponsibleSchema,
} from "../../utils/zodSchemas/userSchema.js";
import { olympicsSchema } from "../../utils/zodSchemas/olympicsSchema.js";
import { z } from "zod";
import {
  createCenterSchema,
  editCenterSchema,
} from "../../utils/zodSchemas/centerSchema.js";
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
    const parsedData = olympicsSchema.parse(req.body);
    const { olympics_id } = req.body;

    try {
      const result = await adminDal.editOlympics(parsedData, olympics_id);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json(error);
      }
    }
  };

    //borrado logico de olimpiadas
  logicalDeleteOlympics = async (req, res) => {
    const { olympics_id } = req.params;
    console.log("ID de la olimpiada recibido:", olympics_id);
    try {
      const result = await adminDal.logicalDeleteOlympics(olympics_id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
      res.status(400).json({ message: "Error al borrar la olimpidada" });
    }
  };

    // Ver Actividades de una Olimpiada

    getOlympicsWithActivity = async (req, res) => {
      const { olympics_id } = req.params;
    
      try {
        const results = await adminDal.getOlympicsWithActivity(olympics_id);
    
        if (results.length > 0) {
          res.status(200).json({message: "Olimpiada y actividades obtenidas correctamente",data: results,});
        }
      } catch (error) {
        res.status(500).json({
          message: "Error al obtener la olimpiada y actividades",error: error.message,});
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
        return res.status(500).json({ message: "El email ya está asociado a un centro" });
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
      console.log(data);
      const parsedData = editCenterSchema.parse(data);
      
      const result = await adminDal.editCenter(parsedData, file);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json(error);
      }
    }
  };

  //Eliminar centro

  deleteCenter = async (req, res) => {
    try {
      let { center_id } = req.params;
      const result = await adminDal.deleteCenter(center_id);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);

      res.status(400).json(error);
    }
  };

  // 3º Apartado de Usuarios
  // Añadir Responsable user_type = 2

  addResponsible = async (req, res) => {
    const parsedData = registerResponsibleSchema.parse(req.body);

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

  // Ver los Responsables user_type = 2 (Recordar Duda)

  getResponsibles = async (req, res) => {
    try {
      const responsibles = await adminDal.getAllResponsibles();
      res.status(200).json(responsibles);
    } catch (error) {
      res.status(500).json({ msg: "Error al obtener responsables", error });
    }
  };

  // Editar Usuario type_user = 3

  editUser = async (req, res) => {
    const parsedData = editUserSchema.parse(req.body);
    const { user_id } = req.body;
    try {
      const result = await adminDal.updateUser(parsedData, user_id);
      return res
        .status(200)
        .json({ message: "Usuario actualizado con éxito.", result });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        console.error("Error en editUser:", error.message);
        return res.status(500).json({
          message: "Error al actualizar usuario.",
          error: error.message,
        });
      }
    }
  };

  // Editar Usuario type_user = 2

  editResponsible = async (req, res) => {
    const parsedData = editResponsibleSchema.parse(req.body);
    const { user_id } = req.body;
    console.log("***", parsedData);

    try {
      const result = await adminDal.updateResponsible(parsedData, user_id);
      return res
        .status(200)
        .json({ message: "Usuario actualizado con éxito.", result });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        console.error("Error en editUser:", error.message);
        return res.status(500).json({
          message: "Error al actualizar usuario.",
          error: error.message,
        });
      }
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

  // Borrado lógico Usuario

  deleteUserLogically = async (req, res) => {
    const { user_id } = req.params;

    try {
      await adminDal.deleteUserLogically(user_id);
      res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (err) {
      res.status(404).json({ message: "Usuario no encontrado o ya eliminado" });
    }
  };

  //busqueda en tiempo real de usuarios
  searchUsers = async (req, res) => {
    try {
      const filter = {};
      const queryKeys = [
        'center_name',
        'user_type',
        'user_name',
        'user_lastname',
        'user_city',
        'user_phone',
        'user_email',
        'user_center_id'
      ];
  
      queryKeys.forEach(key => {
        if (req.query[key]) {
          filter[key] = req.query[key];
        }
      });
  
      
      const users = await adminDal.searchUsers(filter);
  
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error al buscar usuarios", error });
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
    try {
      let {
        activity_name,
        activity_description,
        max_participants,
        activity_id,
      } = req.body;
      let max_participants_number = parseInt(max_participants);
      let img = null;
      if (req.file) {
        img = req.file.filename;
      }
      let values = {
        activity_name,
        activity_description,
        max_participants_number,
        img,
      };

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

      const { activity_id, activity_id_to_delete } = req.body;

  
      await adminDal.updateOlympicsActivities(
        olympics_id,
        activity_id,
        activity_id_to_delete
      );

      res
        .status(200)
        .json({ message: "Actividades actualizadas correctamente" });
    } catch (error) {
      console.log("Error al actualizar actividades", error);
      res.status(500).json({ message: "Error al actualizar actividades" });
    }
  };

  addOlympicsToCenter = async (req, res) => {
    try {
      const { center_id} = req.params;
      const { olympics_id, olympics_id_to_delete } = req.body;

      await adminDal.updateCenterOlympics(
        center_id,
        olympics_id,
        olympics_id_to_delete
      )

      res.status(200).json({ message: "Olimpiadas actualizadas correctamente" });
    } catch (error) {
      console.log("Error al actualizar olimpiadas", error);
      res.status(500).json({ message: "Error al actualizar olimpiadas" });
    }
  }

  // Ver Actividades de una Olimpiada

  getOlympicsActivities = async (req, res) => {
    try {
      const { olympics_id } = req.params;
      const result = await adminDal.getOlympicsActivities(olympics_id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las actividades" });
    }
  };

  getCenterOlympics = async (req, res) => {
    try {
      const { center_id } = req.params;
      const result = await adminDal.getCenterOlympics(center_id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las olimpiadas" });
    }
  }

  //borrado logico de actividades
  logicalDeleteActivity = async (req, res) => {
    const { activity_id } = req.params;
    console.log("ID de la actividad recibido:", activity_id);
    try {
      const result = await adminDal.logicalDeleteActivity(activity_id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
      res.status(400).json({ message: "Error al borrar la actividad" });
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

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res
        .status(200)
        .json({ user_id: user[0].user_id, user_name: user[0].user_name });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al buscar el usuario" });
    }
  };
}

export default new AdminController();
