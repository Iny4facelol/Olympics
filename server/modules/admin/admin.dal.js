import { executeQuery } from "../../config/db.js";
import { dbPool } from "../../config/db.js";

class AdminDal {
  // 1º Apartado de Olimpiadas
  // Añadir Olimpiada

  addOlympics = async (olympicsData) => {
    const {
      olympics_name,
      olympics_host_name,
      olympics_host_city,
      olympics_host_address,
      olympics_start_date,
      olympics_end_date,
      olympics_description,
    } = olympicsData;

    const connection = await dbPool.getConnection();

    try {
      await connection.beginTransaction();
      let sql =
        "INSERT INTO olympics (olympics_name, olympics_host_name, olympics_host_city, olympics_host_address, olympics_start_date, olympics_end_date, olympics_description) VALUES (?,?,?,?,?,?,?)";
      let values = [
        olympics_name,
        olympics_host_name,
        olympics_host_city,
        olympics_host_address,
        olympics_start_date,
        olympics_end_date,
        olympics_description,
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

  // Seleccionar todas las Olimpiadas

  allOlympics = async () => {
    try {
      let sql = "SELECT * FROM olympics WHERE olympics_is_deleted = 0";
      let result = await executeQuery(sql);

      return result;
    } catch (error) {
      throw error;
    }
  };

  // Editar Olimpiada

  editOlympics = async (data, olympics_id) => {
    try {
      const {
        olympics_name,
        olympics_host_name,
        olympics_host_city,
        olympics_host_address,
        olympics_start_date,
        olympics_end_date,
        olympics_description,
      } = data;

      let sql =
        "UPDATE olympics SET olympics_name=?, olympics_host_name=?, olympics_host_city=?, olympics_host_address=?, olympics_start_date=?, olympics_end_date=?, olympics_description=? WHERE olympics_id=?";

      let values = [
        olympics_name,
        olympics_host_name,
        olympics_host_city,
        olympics_host_address,
        olympics_start_date,
        olympics_end_date,
        olympics_description,
        olympics_id,
      ];

      const result = await executeQuery(sql, values);

      return result;
    } catch (error) {
      throw error;
    }
  };

  // 2º Apartado de Centro
  // Crear Centro

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

  // Seleccionar todos los Centros

  getAllCenters = async () => {
    const query = `
      SELECT 
        center_id, 
        center_name, 
        center_city, 
        center_province, 
        center_address, 
        center_phone, 
        center_auth_doc 
      FROM center
    `;
    try {
      const results = await executeQuery(query);
      return results;
    } catch (error) {
      console.error("Error en getAllCenters:", error);
      throw new Error("Error al obtener los centros.");
    }
  };

  // Editar Centro

  editCenter = async (data, file) => {
    const {
      center_id,
      center_name,
      center_city,
      center_province,
      center_address,
      center_phone,
      center_email,
    } = data;
    try {
      let sql =
        "UPDATE center SET center_name = ?, center_city = ?, center_province = ?, center_address = ?, center_phone = ?, center_email = ? WHERE center_id = ?";
      let values = [
        center_name,
        center_city,
        center_province,
        center_address,
        center_phone,
        center_email,
        center_id,
      ];
      if (file) {
        sql =
          "UPDATE center SET center_name = ?, center_city = ?, center_province = ?, center_address = ?, center_phone = ?, center_email = ?, center_auth_doc = ? WHERE center_id = ?";
        values = [
          center_name,
          center_city,
          center_province,
          center_address,
          center_phone,
          center_email,
          file,
          center_id,
        ];
      }
      const result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Seleccionar Centro por ID (Recordar Duda)

  getCenterById = async (centerId) => {
    try {
      const result = await executeQuery(
        `SELECT * FROM center WHERE center_id = ?`,
        [centerId]
      );

      return result;
    } catch (err) {
      throw new Error("Error al obtener centro por id");
    }
  };

  // 3º Apartado de Usuarios
  // Añadir Responsable user_type = 2

  getUserById = async (userId) => {
    try {
      const result = await executeQuery(
        `SELECT user_id, user_name FROM user WHERE user_id = ?`,
        [userId]
      );

      return result;
    } catch (error) {
      throw new Error("Error al obtener user por id");
    }
  };

  addResponsible = async (userData) => {
    const { user_name, user_email, user_center_id } = userData;

    try {
      const result = await executeQuery(
        `INSERT INTO user (user_name, user_email, user_center_id, user_type)
        VALUES (?, ?, ?, ?)`,
        [user_name, user_email, user_center_id, 2]
      );

      return result;
    } catch (err) {
      throw new Error("Error al registrar responsable");
    }
  };

  // Seleccionar Responsables user_type = 2

  getAllResponsibles = async () => {
    try {
      const result = await executeQuery(`SELECT * FROM user WHERE user_type=2`);

      return result;
    } catch (err) {
      throw new Error("Error al obtener responsables");
    }
  };

  // Actualizar Usuario user_type = 3

  updateUser = async (userData, user_id) => {
    try {
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
        user_center_id,
      } = userData;

      let sql = `UPDATE user SET
          user_name = ?, 
          user_lastname = ?, 
          user_tutor_name = ?,
          user_tutor_lastname = ?,
          user_dni = ?,
          user_city = ?,
          user_address = ?,
          user_birth_date = ?,
          user_phone = ?,
          user_center_id = ? 
        WHERE user_id = ?`;
      let values = [
        user_name,
        user_lastname,
        user_tutor_name,
        user_tutor_lastname,
        user_dni,
        user_city,
        user_address,
        user_birth_date,
        user_phone,
        user_center_id,
        user_id,
      ];
      const result = await executeQuery(sql, values);   

      return result;
    } catch (err) {
      console.error("Error al actualizar usuario:", err.message);
      throw new Error("Error al actualizar usuario. Detalles: " + err.message);
    }
  };

  // Actualizar Usuario user_type = 2

  updateResponsible = async (userData, user_id) => {
    try {
      const {
        user_name,
        user_lastname,        
        user_dni,
        user_city,
        user_phone,
        user_center_id,
      } = userData;

      let sql = `UPDATE user SET
          user_name = ?, 
          user_lastname = ?,           
          user_dni = ?,
          user_city = ?,
          user_phone = ?,
          user_center_id = ? 
        WHERE user_id = ?`;
      let values = [
        user_name,
        user_lastname,        
        user_dni,
        user_city,       
        user_phone,
        user_center_id,
        user_id,
      ];
      const result = await executeQuery(sql, values);   

      return result;
    } catch (err) {
      console.error("Error al actualizar usuario:", err.message);
      throw new Error("Error al actualizar usuario. Detalles: " + err.message);
    }
  };

  // Ver todos los Usuarios

  allUser = async () => {
    try {
      let sql = `
    SELECT u.*, c.center_id, c.center_name
    FROM user u
    INNER JOIN center c 
    ON 
    u.user_center_id = c.center_id
    WHERE 
    u.user_is_deleted = 0;
`;
      let result = await executeQuery(sql);

      return result;
    } catch (error) {
      throw error;
    }
  };

  // 4º Apartado de Actividades
  // Añadir Actividad

  addActivity = async (data) => {
    const {
      activity_name,
      activity_description,
      max_participants_number,
      img,
    } = data;

    try {
      let sql =
        "INSERT INTO activity (activity_name, activity_description, max_participants, activity_image) VALUES (?,?,?,?)";
      let values = [
        activity_name,
        activity_description,
        max_participants_number,
        img,
      ];

      const result = await executeQuery(sql, values);

      return result;
    } catch (error) {
      throw error;
    }
  };

  // Seleccionar Actividades

  allActivity = async () => {
    try {
      let sql = "SELECT * FROM activity WHERE activity_is_deleted = 0";
      let result = await executeQuery(sql);

      return result;
    } catch (error) {
      throw error;
    }
  };

  // Editar Actividad

  editActivity = async (data, activity_id) => {
    const {
      activity_name,
      activity_description,
      max_participants_number,
      img,
    } = data;

    console.log("data en dal", data);

    try {
      let sql =
        "UPDATE activity SET activity_name = ?, activity_description = ?, max_participants = ?, activity_image = ?  WHERE activity_id = ?";
      let values = [
        activity_name,
        activity_description,
        max_participants_number,
        img,
        activity_id,
      ];

      const result = await executeQuery(sql, values);

      return result;
    } catch (error) {
      throw error;
    }
  };

  // Añadir Actividad a Olimpiada

  saveActivity = async (olympics_id, activity_id) => {
    try {
      const query = `
        INSERT INTO olympics_activity (olympics_id, activity_id)
        VALUES (?, ?)
      `;
      const [result] = await dbPool.query(query, [olympics_id, activity_id]);
      return result;
    } catch (error) {
      console.error("Error al guardar la actividad", error);
      throw error;
    }
  };
}

export default new AdminDal();
