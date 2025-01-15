import { executeQuery } from '../../config/db.js';
import { dbPool } from "../../config/db.js";

class AdminDal {
  addOlympics = async (data) => {
    const {
      olympics_name,
      olympics_host_name,
      olympics_host_city,
      olympics_host_address,
      olympics_start_date,
      olympics_end_date,
      olimpics_description,
    } = data;


    const connection = await dbPool.getConnection();
    try {
      await connection.beginTransaction();
      let sql =
        "INSERT INTO olympics (olympics_name, olympics_host_name, olympics_host_city, olympics_host_address, olympics_start_date, olympics_end_date, olimpics_description) VALUES (?,?,?,?,?,?,?)";
      let values = [
        olympics_name,
        olympics_host_name,
        olympics_host_city,
        olympics_host_address,
        olympics_start_date,
        olympics_end_date,
        olimpics_description,
      ];
      const result = await connection.execute(sql, values);

      const olympics_id = result[0].insertId;
      connection.commit();
      return olympics_id;
    } catch (error) {
      await connection.rollback();
      console.log("Error en insert olympics", error);
      throw error;
    } finally {
      connection.release();
    }
  };

  createCenter = async (centerData) => {
    const { center_name, center_email } = centerData;

    try {
      const result = await executeQuery(
        `INSERT INTO center (center_name, center_email)
        VALUES (?, ?)`, 
        [center_name, center_email]
      );

      return result;
    } catch (err) {
      console.log("Error al crear el centro:", err);
      throw new Error("Error al crear el centro");
    }
  };
  addResponsible = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const values = { name, email, password };
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
}

export default new AdminDal();
