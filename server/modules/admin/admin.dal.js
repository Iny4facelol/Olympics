import { executeQuery } from "../../config/db.js";
import { dbPool } from "../../config/db.js";

class AdminDal {
  addOlympics = async (olympicsData) => {
    const {
      olympics_name,
      olympics_host_name,
      olympics_host_city,
      olympics_host_address,
      olympics_start_date,
      olympics_end_date,
      olimpics_description,
    } = olympicsData;


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
      connection.commit();
      return result;
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
  
  addResponsible = async (userData) => {
    const {
      user_name,
      user_email,
      center_id
    } = userData;

    try {
      const result = await executeQuery(
        `INSERT INTO user (user_name, user_email, center_id, user_type)
        VALUES (?, ?, ?, ?)`,
        [user_name, user_email, center_id, 2]
      );
      return result;
    } catch (err) {
      console.log("Error al registrar responsable:", err);
      throw new Error("Error al registrar responsable");
    }
  };

  getAllResponsibles = async () => {
    try {
      const result = await executeQuery(
        `SELECT * FROM user WHERE user_type=2`
      );
      return result;
    } catch (err) {
      console.log("Error al obtener responsables:", err);
      throw new Error("Error al obtener responsables");
    }

  };  

  addActivity = async (data, file) => {
    const { activity_name, activity_description, max_participants, activity_image } = data;
    
    try {      
      console.log("log en dal", data);
      let sql = 'INSERT INTO activity (activity_name, activity_description, max_participants) VALUES (?,?,?)';
      let values = [activity_name, activity_description, max_participants]
      if(file){
        sql= 'INSERT INTO activity (activity_name, activity_description, max_participants, activity_image) VALUES (?,?,?,?)'
        values = [activity_name, activity_description, max_participants, activity_image]
      }
      const result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      console.log("*******Error al crear actividad en dal", error);
      throw error;
    }
  }

  allOlympics = async () => {
    try {
      let sql = 'SELECT * FROM olympics WHERE olympics_is_deleted = 0'
      let result = await executeQuery(sql)
      return result
    } catch (error) {
      throw (error);      
    }
  }

  allActivity = async () => {
    try {
      let sql = 'SELECT * FROM activity WHERE activity_is_deleted = 0'
      let result = await executeQuery(sql)
      return result
    } catch (error) {
      throw (error)
    }
  }

}

export default new AdminDal();
