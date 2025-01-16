import adminDal from "./admin.dal.js";

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
      const { user_name, user_email, user_password } = req.body;
      const values = { user_name, user_email, user_password};
      const result = await adminDal.register(values);
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
      const result = await adminDal.addActivity(data, file)
      return res.status(201).json({
        message: "actividad creada",
        activity_id: result.insertId,
      });
    } catch (error) {
      res.status(500).json({ msg: "Error al crear actividad" });
    }
  };

  
}

export default new AdminController();
