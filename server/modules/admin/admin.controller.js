import { createCenter } from "./admin.dal.js";
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
      console.log("************error", error);
      res.status(500).json(error);
    }
  };

  addCenter = async (req, res) => {
    const centerData = req.body;

    try {
      const result = await createCenter(centerData);

      return res.status(201).json({
        message: "Centro creado con éxito",
        centerId: result.insertId,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error al crear el centro" });
    }
  };
}

export default new AdminController();
