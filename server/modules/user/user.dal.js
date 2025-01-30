import { dbPool, executeQuery } from "../../config/db.js";

class UserDal {
  // 1º Apartado de Usuario
    // Registro de Usuario
  
  register = async (values) => {
    try {
      let sql = `
        INSERT INTO user (
          user_name,
          user_lastname,
          user_tutor_name,
          user_tutor_lastname,
          user_dni,
          user_city,
          user_address,
          user_phone,
          user_birth_date,
          user_email,
          user_password,
          user_center_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;

      const result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  };

    // Seleccionar Usuario por ID

  findUserById = async (user_id) => {
    try {
      let sql = `SELECT * FROM user WHERE user_id = ? AND user_is_deleted = 0`;
      let result = await executeQuery(sql, [user_id]);
      return result;
    } catch (error) {
      throw error;
    }
  }

    // Seleccionar Usuario por Email

  getUserByEmail = async (email) => {
    try {
      let sql = `SELECT * FROM user WHERE user_email = ? AND user_is_deleted = 0 AND user_is_validated = 1`;
      let result = await executeQuery(sql, [email]);
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  };

    // Completar registro de Responsable

  completeResponsible = async (values) => {
    try {
      let sql = `
        UPDATE user SET 
          user_name = ?, 
          user_lastname = ?, 
          user_dni = ?, 
          user_phone = ?, 
          user_password = ?,
          user_is_validated = 1          
        WHERE user_id = ?
      `;
      const result = await executeQuery(sql, values);

      return result;
    } catch (error) {
      throw new Error("Error al completar responsable");
    }
  };

    // Actualizar Responsable

  updateResponsible = async (user_id, userData) => {
    const {
      user_name,
      user_lastname,
      user_dni,
      user_city,
      user_phone,
      user_center_id,
    } = userData;

    try {
      const result = await executeQuery(
        `UPDATE user SET
            user_name = ?,
            user_lastname = ?,
            user_dni = ?,
            user_city = ?,
            user_phone = ?,
            user_center_id = ?
          WHERE user_id = ? 
          AND user_type = 2`,
        [
          user_name,
          user_lastname,
          user_dni,
          user_city,
          user_phone,
          user_center_id,
          user_id,
        ]
      );
      return result;
    } catch (err) {
      throw new Error("Error al actualizar responsable");
    }
  };

    // Actualizar Usuario 

  updateUserUser = async (user_id, userData) => {
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

    try {
      const result = await executeQuery(
        `UPDATE user SET
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
          WHERE user_id = ?`,
        [
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
        ]
      );
      return result;
    } catch (err) {
      console.error("Error al actualizar usuario:", err);
      throw new Error("Error al actualizar usuario");
    }
  };

    // Detalles de un Usuario 
  
  searchUserDetails = async (user_id) => {
    try {
      const query = `
      SELECT 
      user.user_id,
      user.user_name,
      user.user_lastname,
      center.center_id,
      center.center_name,
      center.center_city,
      center.center_address,
      olympics.olympics_id,
      olympics.olympics_name,
      olympics.olympics_host_name,
      olympics.olympics_host_city,
      olympics.olympics_host_address,
      olympics.olympics_start_date,
      olympics.olympics_end_date,
      GROUP_CONCAT(DISTINCT activity.activity_name ORDER BY activity.activity_name SEPARATOR ', ') AS activities_names,
      GROUP_CONCAT(DISTINCT activity.activity_id ORDER BY activity.activity_name SEPARATOR ', ') AS activities_ids,
      GROUP_CONCAT(DISTINCT activity.activity_image ORDER BY activity.activity_name SEPARATOR ', ') AS activities_images,
      (
        SELECT GROUP_CONCAT(CONCAT(u.user_name, ' ', u.user_lastname) ORDER BY u.user_name SEPARATOR ', ')
        FROM user u
        WHERE u.user_center_id = center.center_id
        AND u.user_type = 2
        AND u.user_is_deleted = 0
      ) AS responsables
      FROM reservation
      JOIN user ON reservation.user_id = user.user_id
      JOIN center ON reservation.center_id = center.center_id
      JOIN olympics ON reservation.olympics_id = olympics.olympics_id
      JOIN activity ON reservation.activity_id = activity.activity_id
      WHERE user.user_is_deleted = 0
      AND center.center_is_deleted = 0
      AND olympics.olympics_is_deleted = 0
      AND activity.activity_is_deleted = 0
      AND user.user_id = ?
      GROUP BY 
      user.user_id,
      center.center_id,
      olympics.olympics_id;

      `;
      const result = await executeQuery(query, [user_id]);

      return result;
    } catch (error) {
      console.error("Error en fetchUserDetails:", error);
      throw error;
    }
  };

    // Actualizar Contraseña de Usuario

  updatePassword = async (hash, user_id) => {
    try {
      let sql = "UPDATE user SET user_password = ? WHERE user_id = ?";
      let values = [hash, user_id]
      const result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw new Error("Error al actualizar la contraseña")
    }
  }

  // 2º Apartado Centro
    // Seleccionar Centro

  getCenter = async () => {
    try {
      let sql = `SELECT center_name, center_id FROM center WHERE center_is_deleted = 0`;
      let result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw error;
    }
  };

    //Completar Centro

  completeCenter = async (centerData) => {
    const {
      center_id,
      center_city,
      center_province,
      center_address,
      center_phone,
      center_auth_doc,
    } = centerData;

    try {
      const sql = `
        UPDATE center
        SET 
          center_city = ?, 
          center_province = ?, 
          center_address = ?, 
          center_phone = ?, 
          center_auth_doc = ?
        WHERE center_id = ?
      `;
      const result = await executeQuery(sql, [
        center_city,
        center_province,
        center_address,
        center_phone,
        center_auth_doc,
        center_id,
      ]);
      return result;
    } catch (error) {
      throw new Error("Error al completar el centro");
    }
  };
  
  // 3º Apartado de Actividades
    // Actividades de un Usuario 

  getUserActivities = async (user_id, olympics_id) => {
    try {
      const query = `
      SELECT activity_id 
      FROM reservation 
      WHERE user_id = ? 
      AND olympics_id = ?
    `;
      const result = await executeQuery(query, [user_id, olympics_id]);
      return result;
    } catch (error) {
      console.error("Error al obtener actividades del usuario:", error);
      throw new Error("Error al obtener actividades del usuario");
    }
  };
  
    // Actividades de una Olimpiada

  getActivitiesFromOlympics = async (olympics_id) => {
    try {
      let sql = `
      SELECT DISTINCT a.activity_id, a.activity_name
      FROM activity a
      INNER JOIN olympics_activity oa ON a.activity_id = oa.activity_id
      WHERE oa.olympics_id = ? AND a.activity_is_deleted = 0;
      `;
      const result = await executeQuery(sql, [olympics_id]);
      console.log("asdadasdsadasd", result);
      return result;
    } catch (error) {
      throw new Error("Error al obtener actividades de la olimpiada");
    }
  };

  // 4º Apartado de Validaciones y Autorizaciones
    // Usuario Pendiente de Validación

  getPendingValidationUsers = async (user_center_id) => {
    try {
      const query = `
        SELECT user_id, user_name, user_lastname, user_permission_file
        FROM user
        WHERE user_center_id = ? AND user_type = 3 AND user_is_auth = false;
      `;
      const values = [user_center_id];
      const result = await executeQuery(query, values);
      return result;
    } catch (error) {
      console.error("Error al obtener usuarios pendientes de validar:", error);
      throw error;
    }
  };

    // Actualizar Estado de Autorización

  updateAuthorizationPath = async (user_id, filePath) => {
    try {
      const result = await executeQuery(
        "UPDATE user SET user_permission_file = ? WHERE user_id = ?",
        [filePath, user_id]
      );
      return result;
    } catch (err) {
      console.error("Error en updateAuthorizationPath:", err.message);
      throw err;
    }
  };
  
    // Validar Documento de Autorización

  updateDocumentValidation = async (user_id) => {
    try {
      const result = await executeQuery(
        `UPDATE user SET user_is_auth = 1 WHERE user_id = ?`,
        [user_id]
      );

      return result;
    } catch (err) {
      console.error("Error al validar documento:", err);
      throw new Error("Error al validar documento");
    }
  };

    // Obtener Autorización
  
  getAuthorizationPath = async (userId) => {
    const query = `
      SELECT user_permission_file
      FROM user
      WHERE user_id = ?;
    `;
    try {
      const result = await executeQuery(query, [userId]);
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error("Error en getAuthorizationPath:", error);
      throw error;
    }
  };

    // Obtener Usuario Autorizado por ID

  getUnauthorizedUserById = async (userId) => {
    try {
      const query = `
        SELECT user_id, 
        user_name, user_is_auth 
        FROM user 
        WHERE user_id = ? 
      `;
      const values = [userId];
      const result = await executeQuery(query, values);

      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error("Error al obtener el usuario no autorizado por id:", error);
      throw new Error("Error al obtener el usuario no autorizado por id");
    }
  };

    // Validar Registro de Usuario 

  validateRegistrationUser = async (user_id) => {
    try {
      let sql = `
        UPDATE user
        SET user_is_validated = 1
        WHERE user_id = ?;
      `;
      const result = await executeQuery(sql, [user_id]);
      return result;
    } catch (error) {
      throw new Error("Error al validar usuario");
    }
  };

    // Seleccionar Autorización del centro

  getAuthorizationFileFromDB = async (user_id) => {
    try {
      const sql = `
        SELECT c.center_auth_doc
        FROM center c
        INNER JOIN user u ON u.user_center_id = c.center_id
        WHERE u.user_id = ? AND u.user_is_deleted = 0;
      `;
      const result = await executeQuery(sql, [user_id]);

      if (result && result.length > 0) {
        return result[0].center_auth_doc;
      }
      return null;
    } catch (error) {
      throw error;
    }
  };

    // Guardar el archivo

  saveUserPermissionFile = async (user_id, fileName, filePath) => {
    try {
      const query = `
        UPDATE user 
        SET user_permission_file = ?, 
            user_is_auth = true
        WHERE user_id = ?
      `;
      await executeQuery(query, [filePath, user_id]);
    } catch (error) {
      console.error("Error al guardar el archivo en la base de datos:", error);
      throw error;
    }
  };

    // DUDA , donde poner 

  getUsersToAddActivity = async (user_center_id) => {
    try {
      let sql = `
        SELECT u.user_id, u.user_name, u.user_lastname, u.user_email, u.user_phone, o.olympics_id
          FROM user u
          JOIN center c ON c.center_id = u.user_center_id
          JOIN olympics_center o ON c.center_id = o.center_id
          WHERE u.user_type = 3
          AND u.user_is_auth = TRUE
          AND u.user_center_id = ?;
          `;

      const result = await executeQuery(sql, user_center_id);
      return result;
    } catch (error) {
      throw error;
    }
  };

    // DUDA, donde poner

  addActivityToUser = async (user_id, activities, center_id, olympics_id) => {
    const connection = await dbPool.getConnection();
    try {
      await connection.beginTransaction();

      // Primero, eliminar las reservaciones existentes para este usuario y olimpiada

      const deleteQuery = `
      DELETE FROM reservation 
      WHERE user_id = ? 
      AND olympics_id = ?
    `;
      await connection.query(deleteQuery, [user_id, olympics_id]);

      // Luego, insertar las nuevas actividades

      const insertQuery = `
      INSERT INTO reservation (user_id, activity_id, center_id, olympics_id)
      VALUES (?, ?, ?, ?)
    `;

      // Procesar cada activity_id del array

      for (const activity_id of activities) {
        await connection.query(insertQuery, [
          user_id,
          activity_id,
          center_id,
          olympics_id,
        ]);
      }

      await connection.commit();

      return {
        message: `${activities.length} actividades actualizadas para el usuario con éxito.`,
        success: true,
      };
    } catch (error) {
      if (connection) {
        await connection.rollback();
      }
      console.error("Error en el DAL:", error);
      throw new Error("Error al actualizar actividades del usuario");
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };

  getUserActivities = async (user_id, olympics_id) => {
    try {
      const query = `
      SELECT activity_id 
      FROM reservation 
      WHERE user_id = ? 
      AND olympics_id = ?
    `;
      const result = await executeQuery(query, [user_id, olympics_id]);
      return result;
    } catch (error) {
      console.error("Error al obtener actividades del usuario:", error);
      throw new Error("Error al obtener actividades del usuario");
    }
  };

  getPendingValidationUsers = async (user_center_id) => {
    try {
      const query = `
        SELECT user_id, user_name, user_lastname, user_permission_file
        FROM user
        WHERE user_center_id = ? AND user_type = 3 AND user_is_auth = false;
      `;
      const values = [user_center_id];
      const result = await executeQuery(query, values);
      return result;
    } catch (error) {
      console.error("Error al obtener usuarios pendientes de validar:", error);
      throw error;
    }
  };

  searchUserDetails = async (user_id) => {
    try {
      const query = `
    SELECT 
    user.user_id,
    user.user_name,
    user.user_lastname,
    center.center_id,
    center.center_name,
    center.center_city,
    center.center_address,
    olympics.olympics_id,
    olympics.olympics_name,
    olympics.olympics_host_name,
    olympics.olympics_host_city,
    olympics.olympics_host_address,
    olympics.olympics_start_date,
    olympics.olympics_end_date,
    GROUP_CONCAT(DISTINCT activity.activity_name ORDER BY activity.activity_name SEPARATOR ', ') AS activities_names,
    GROUP_CONCAT(DISTINCT activity.activity_id ORDER BY activity.activity_name SEPARATOR ', ') AS activities_ids,
    GROUP_CONCAT(DISTINCT activity.activity_image ORDER BY activity.activity_name SEPARATOR ', ') AS activities_images,
    (
        SELECT GROUP_CONCAT(CONCAT(u.user_name, ' ', u.user_lastname) ORDER BY u.user_name SEPARATOR ', ')
        FROM user u
        WHERE u.user_center_id = center.center_id
        AND u.user_type = 2
        AND u.user_is_deleted = 0
    ) AS responsables
    FROM reservation
    JOIN user ON reservation.user_id = user.user_id
    JOIN center ON reservation.center_id = center.center_id
    JOIN olympics ON reservation.olympics_id = olympics.olympics_id
    JOIN activity ON reservation.activity_id = activity.activity_id
    WHERE user.user_is_deleted = 0
    AND center.center_is_deleted = 0
    AND olympics.olympics_is_deleted = 0
    AND activity.activity_is_deleted = 0
    AND user.user_id = ?
    GROUP BY 
    user.user_id,
    center.center_id,
    olympics.olympics_id;

      `;
      const result = await executeQuery(query, [user_id]);

      return result;
    } catch (error) {
      console.error("Error en fetchUserDetails:", error);
      throw error;
    }
  };

  updateAuthorizationPath = async (user_id, filePath) => {
    console.log("Entrando a updateAuthorizationPath...");
    console.log("Datos recibidos - user_id:", user_id, "filePath:", filePath);

    try {
      const result = await executeQuery(
        "UPDATE user SET user_permission_file = ? WHERE user_id = ?",
        [filePath, user_id]
      );
      console.log("Resultado de la actualización en la base de datos:", result);
      return result;
    } catch (err) {
      console.error("Error en updateAuthorizationPath:", err.message);
      throw err;
    }
  };

  getAuthorizationPath = async (userId) => {
    const query = `
      SELECT user_permission_file
      FROM user
      WHERE user_id = ?;
    `;
    try {
      const result = await executeQuery(query, [userId]);
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error("Error en getAuthorizationPath:", error);
      throw error;
    }
  };

  getUnauthorizedUserById = async (userId) => {
    try {
      const query = `
        SELECT user_id, 
        user_name, user_is_auth 
        FROM user 
        WHERE user_id = ? 
      `;
      const values = [userId];
      console.log("values", values);
      console.log(userId);

      const result = await executeQuery(query, values);

      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error("Error al obtener el usuario no autorizado por id:", error);
      throw new Error("Error al obtener el usuario no autorizado por id");
    }
  };

  validateRegistrationUser = async (user_id) => {
    try {
      let sql = `
        UPDATE user
        SET user_is_validated = 1
        WHERE user_id = ?;
      `;
      const result = await executeQuery(sql, [user_id]);
      return result;
    } catch (error) {
      throw new Error("Error al validar usuario");
    }
  };

  getActivitiesFromOlympics = async (olympics_id) => {
    try {
      let sql = `
      SELECT DISTINCT a.activity_id, a.activity_name
      FROM activity a
      INNER JOIN olympics_activity oa ON a.activity_id = oa.activity_id
      WHERE oa.olympics_id = ? AND a.activity_is_deleted = 0;
      `;
      const result = await executeQuery(sql, [olympics_id]);
      console.log("asdadasdsadasd", result);
      return result;
    } catch (error) {
      throw new Error("Error al obtener actividades de la olimpiada");
    }
  };

  getAuthorizationFileFromDB = async (user_id) => {
    try {
      const sql = `
        SELECT c.center_auth_doc
        FROM center c
        INNER JOIN user u ON u.user_center_id = c.center_id
        WHERE u.user_id = ? AND u.user_is_deleted = 0;
      `;
      const result = await executeQuery(sql, [user_id]);

      if (result && result.length > 0) {
        return result[0].center_auth_doc;
      }
      return null;
    } catch (error) {
      throw error;
    }
  };

  saveUserPermissionFile = async (user_id,fileName) => {
    try {
      const query = `
        UPDATE user   
        SET user_permission_file = ?, 
        WHERE user_id = ?
      `;
      await executeQuery(query, [fileName, user_id]);
      console.log("Archivo guardado en la base de datos.");
    } catch (error) {
      console.error("Error al guardar el archivo en la base de datos:", error);
      throw error;
    }
  };

  updatePassword = async (hash, user_id) => {
    try {
      let sql = "UPDATE user SET user_password = ? WHERE user_id = ?";
      let values = [hash, user_id]
      const result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw new Error("Error al actualizar la contraseña")
    }
  }
}

export default new UserDal();
