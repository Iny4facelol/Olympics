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
        "UPDATE olympics SET olympics_name = ?, olympics_host_name = ?, olympics_host_city = ?, olympics_host_address = ?, olympics_start_date = ?, olympics_end_date = ?, olympics_description = ? WHERE olympics_id = ?";

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

    //borrado logico de olimpiada

  logicalDeleteOlympics = async (olympics_id) => {
    let sql = ` UPDATE olympics SET olympics_is_deleted = 1 WHERE olympics_id = ?`;

    try {
      const result = await executeQuery(sql, [olympics_id]);
      return result;
    } catch (error) {
      console.error(
        "Error al realizar el borrado lógico de la olimpidada:",
        error
      );
      throw new Error("Error al realizar el borrado lógico de la olimpidada");
    }
  };

    // Seleccionar las Actividades de una Olimpiada

  getOlympicsWithActivity = async (olympics_id) => {
    const query = `
      SELECT 
        olympics.olympics_id,
        olympics.olympics_name,
        olympics.olympics_description,
        activity.activity_id,
        activity.activity_name,
        activity.activity_description
      FROM 
        olympics
      LEFT JOIN 
        olympics_activity ON olympics.olympics_id = olympics_activity.olympics_id
      LEFT JOIN 
        activity ON olympics_activity.activity_id = activity.activity_id
      WHERE 
        olympics.olympics_id = ?;
    `;
  
    try {
      const results = await executeQuery(query, [olympics_id]);
  
      return results;
    } catch (error) {
      throw new Error("Error al obtener la olimpiada y actividades: " + error.message);
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
        center_email, 
        center_city, 
        center_province, 
        center_address, 
        center_phone, 
        center_auth_doc 
      FROM center WHERE center_is_deleted = 0
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

    // Eliminar centro

  deleteCenter = async (center_id) => {
    let sql = "UPDATE center SET center_is_deleted = 1 WHERE center_id = ?";
    try {
      const result = await executeQuery(sql, center_id);
      return result;
    } catch (error) {
      throw error;
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
      const result = await executeQuery(
        `SELECT * FROM user WHERE user_type=2 AND user_is_deleted = 0`
      );

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
    user_type IN (2, 3)
    AND
    u.user_is_deleted = 0
    
    ;
`;
      let result = await executeQuery(sql);

      return result;
    } catch (error) {
      throw error;
    }
  };

    // Borrado lógico Usuario

  deleteUserLogically = async (user_id) => {
    const query = "UPDATE user SET user_is_deleted = 1 WHERE user_id = ?";
    try {
      const results = await executeQuery(query, [user_id]);
      return results;
    } catch (err) {
      throw new Error(err.message);
    }
  };

    //Búsqueda en tiempo real usuarios

  searchUsers = async (filter) => {
    try {
      // Lista de claves permitidas para los filtros
      const allowedKeys = [
        'center_name',       // Desde la tabla "center"
        'user_type',         // Desde la tabla "user"
        'user_name',         // Desde la tabla "user"
        'user_lastname',     // Desde la tabla "user"
        'user_city',         // Desde la tabla "user"
        'user_phone',        // Desde la tabla "user"
        'user_email',        // Desde la tabla "user"
        'user_center_id'     // Desde la tabla "user"
      ];
  
      let query = `
        SELECT 
          user.user_id, 
          user.user_name, 
          user.user_lastname, 
          user.user_city, 
          user.user_phone, 
          user.user_email, 
          user.user_type,
          center.center_name,
          center.center_city
        FROM 
          user
        LEFT JOIN 
          center ON user.user_center_id = center.center_id
        WHERE 
          user.user_is_deleted = 0
      `;
      const params = [];
  
      // Filtrar las claves permitidas y construir el WHERE dinámico

      Object.keys(filter).forEach((key) => {
        if (allowedKeys.includes(key)) {
          query += ` AND ${key.includes('center_') ? 'center' : 'user'}.${key} = ?`;
          params.push(filter[key]);
        }
      });
  
      // Ejecutar la consulta con los parámetros

      const [result] = await executeQuery(query, params);
      return result;
    } catch (error) {
      console.error('Error al buscar usuarios en el DAL:', error);
      throw new Error('Error al buscar usuarios');
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

  getOlympicsActivities = async (olympics_id) => {
    try {
      let sql = `SELECT * FROM olympics_activity WHERE olympics_id = ?`;
      let result = await executeQuery(sql, olympics_id);

      return result;
    } catch (error) {
      throw error;
    }
  };

  getCenterOlympics = async (center_id) => {
    try {
      let sql = `SELECT * FROM olympics_center WHERE center_id = ?`;
      let result = await executeQuery(sql, center_id);

      return result;
    } catch (error) {
      throw error;
    }
  }

  updateCenterOlympics = async (centerId, checkedOlympics, toDeleteOlympics) => {
    const connection = await dbPool.getConnection();

    try {
      await connection.beginTransaction();

      // Borrar las olimpiadas que se desmarcaron
      if (toDeleteOlympics.length > 0) {
        await connection.query(
          "DELETE FROM olympics_center WHERE center_id = ? AND olympics_id IN (?)",
          [centerId, toDeleteOlympics]
        );
      }
      // Insertar las olimpiadas que se marcaron
      if (checkedOlympics.length > 0) {
        const insertValues = checkedOlympics.map((olympicsId) => [
          centerId,
          olympicsId,
        ]);

        await connection.query(
          "INSERT IGNORE INTO olympics_center (center_id, olympics_id) VALUES ?",
          [insertValues]
        );
      }

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

    // Editar Actividad

  editActivity = async (data, activity_id) => {
    const {
      activity_name,
      activity_description,
      max_participants_number,
      img,
    } = data;

    try {
      let sql =
        "UPDATE activity SET activity_name = ?, activity_description = ?, max_participants = ?  WHERE activity_id = ?";
      let values = [
        activity_name,
        activity_description,
        max_participants_number,
        activity_id,
      ];

      if (img) {
        sql =
          "UPDATE activity SET activity_name = ?, activity_description = ?, max_participants = ?, activity_image = ?  WHERE activity_id = ?";
        values = [
          activity_name,
          activity_description,
          max_participants_number,
          img,
          activity_id,
        ];
      }
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

    // Eliminar Actividad de Olimpiada

  updateOlympicsActivities = async (
    olympicsId,
    checkedActivities,
    toDeleteActivities
  ) => {
    const connection = await dbPool.getConnection();

    try {
      await connection.beginTransaction();

      // Borrar las actividades que se desmarcaron
      if (toDeleteActivities.length > 0) {
        await connection.query(
          "DELETE FROM olympics_activity WHERE olympics_id = ? AND activity_id IN (?)",
          [olympicsId, toDeleteActivities]
        );
      }
      // Insertar las actividades que se marcaron
      if (checkedActivities.length > 0) {
        const insertValues = checkedActivities.map((activityId) => [
          olympicsId,
          activityId,
        ]);

        await connection.query(
          "INSERT IGNORE INTO olympics_activity (olympics_id, activity_id) VALUES ?",
          [insertValues]
        );
      }

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  };

    //borrado logico de actividad
    
  logicalDeleteActivity = async (activity_id) => {
    let sql = ` UPDATE activity SET activity_is_deleted = 1 WHERE activity_id = ?`;

    try {
      const result = await executeQuery(sql, activity_id);
      return result;
    } catch (error) {
      console.error(
        "Error al realizar el borrado lógico de la actividad:",
        error
      );
      throw new Error("Error al realizar el borrado lógico de la actividad");
    }
  };
}

export default new AdminDal();
