import adminDal from "./admin.dal.js";
import jwt from "jsonwebtoken";
import emailService from "../../utils/emailUtils/emailService.js";

console.log(process.env.EMAIL_PASSWORD);

class AdminController {
  addOlympics = async (req, res) => {
    const olympicsData = req.body;
    try {
      const result = await adminDal.addOlympics(olympicsData);
      return res.status(201).json({
        message: "olimpiada creada con éxito",
        olympics_id: result.insertId,
      });
    } catch (error) {
      res.status(500).json({ msg: "Error al crear las olimpiadas" });
    }
  };

  addCenter = async (req, res) => {
    const centerData = req.body;

    try {
      const result = await adminDal.createCenter(centerData);

      const token = jwt.sign(
        { center_id: result.insertId },
        process.env.TOKEN_KEY,
        { expiresIn: "24h" }
      );

      await emailService.sendRegistrationEmail(centerData, token);

      return res.status(201).json({
        message: "Centro creado con éxito",
        centerId: result.insertId,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error al crear el centro" });
    }
  };

  addResponsible = async (req, res) => {
    try {

      const { user_name, user_email, user_center_id, user_type, user_password } = req.body;
      const values = { user_name, user_email, user_center_id, user_type, user_password};
      const result = await adminDal.addResponsible(values);

      res.status(200).json({ msg: "Responsable registrado con éxito", result });
    } catch (error) {
      res.status(500).json({ msg: "Error al registrar responsable", error });
    }
  };

  getResponsibles = async (req, res) => {
    try {
      const responsibles = await adminDal.getAll();
      res.status(200).json(responsibles);
    } catch (error) {
      res.status(500).json({ msg: "Error al obtener responsables", error });
    }
  };

  addActivity = async (req, res) => {
    try {
      const data = req.body;
      console.log("log en controller", data);

      const file = req.file;
      const result = await adminDal.addActivity(data, file);
      return res.status(201).json({
        message: "actividad creada",
        activity_id: result.insertId,
      });
    } catch (error) {
      res.status(500).json({ msg: "Error al crear actividad" });
    }
  };


  verifyToken = async (req, res) => {
    try {
      const { token } = req.params;
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      const center = await adminDal.getCenterById(decoded.center_id);
      if (!center) {
        return res.status(404).json({ message: "Centro no encontrado" });
      }

      console.log("EL CENTER ID EN EL CONTROLLER", center[0].center_id);

      res.status(200).json({ center_id: center[0].center_id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al buscar el centro" });
    }
  };

  allOlympics = async (req, res) => {
    try {
      let result = await adminDal.allOlympics()    
      return res.status(200).json(result)
           
    } catch (error) {
      res.status(500).json(error)
    } 
  }

  allActivity = async (req,res) => {
    try {
      let result = await adminDal.allActivity()
      return res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  allUser = async (req, res) => {
    try {
      let result = await adminDal.allUser()
      return res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  editOlympics = async (req, res) => {
    try {
      const result = await adminDal.editOlympics(req.body)
      
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  editActivity = async (req, res) => {    
    try {
      let data = req.body;      
      let img = null;
      if(req.file){
        img= req.file.filename
      }
      const result = await adminDal.editActivity(data, img);
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  } 

}

export default new AdminController();
