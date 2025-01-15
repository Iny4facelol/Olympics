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
    const {
      center_name,
      center_city,
      center_province,
      center_address,
      center_phone,
      center_email,
      center_auth_doc
    } = centerData;
  
    try {
      const result = await executeQuery(
        `INSERT INTO center (center_name, center_city, center_province, center_address, center_phone, center_email, center_auth_doc)
        VALUES (?, ?, ?, ?, ?, ?, ?)`, 
        [center_name, center_city, center_province, center_address, center_phone, center_email, center_auth_doc]
      );
  
      return result;
    } catch (err) {
      console.log("Error al crear el centro:", err);
      throw new Error("Error al crear el centro");
    }
  };
}

export default new AdminDal();
