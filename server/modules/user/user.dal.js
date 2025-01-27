import { executeQuery } from "../../config/db.js";

class UserDal {
  getCenter = async () => {
    try {
      let sql = `SELECT center_name, center_id FROM center WHERE center_is_deleted = 0`;
      let result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw error;
    }
  };

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

  completeResponsible = async (values) => {
    try {
      let sql = `
        UPDATE user SET 
          user_name = ?, 
          user_lastname = ?, 
          user_dni = ?, 
          user_phone = ?, 
          user_password = ?          
        WHERE user_id = ?
      `;
      const result = await executeQuery(sql, values);

      return result;
    } catch (error) {
      throw new Error("Error al completar responsable");
    }
  };

  updateResponsible = async (user_id, userData) => {
    const { user_name, user_lastname, user_phone, user_dni } = userData;

    try {
      const result = await executeQuery(
        `UPDATE user SET
           user_name = ?,
           user_lastname = ?,
           user_phone = ?,
           user_dni = ?
         WHERE user_id = ? 
         AND user_type = 2`,
        [user_name, user_lastname, user_phone, user_dni, user_id]
      );
      return result;
    } catch (err) {
      throw new Error("Error al actualizar responsable");
    }
  };

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
  //REVISADO CON SANTI
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

  // REVISADO CON SANTI
  addActivityToUser = async (user_id, activity_id, center_id, olympics_id) => {
    try {
      const query = `
        INSERT INTO reservation (user_id, activity_id, center_id, olympics_id)
        VALUES (?, ?, ?, ?)
      `;
      const result = await executeQuery(query, [
        user_id,
        activity_id,
        center_id,
        olympics_id,
      ]);

      return {
        message: "Actividad añadida al usuario con éxito.",
        result,
      };
    } catch (error) {
      console.error("Error en el DAL:", error);
      throw new Error("Error al añadir actividad al usuario");
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
            user.user_name,
            user.user_lastname,
            center.center_name,
            center.center_city,
            center.center_address,
            responsable.user_name AS responsable_name,
            responsable.user_lastname AS responsable_lastname,
            olympics.olympics_name,
            olympics.olympics_host_name,
            olympics.olympics_host_city,
            olympics.olympics_host_address,
            olympics.olympics_start_date,
            olympics.olympics_end_date,
            activity.activity_name,
            activity.activity_id
        FROM 
            user
        LEFT JOIN 
            center ON user.user_center_id = center.center_id
        LEFT JOIN 
            olympics ON user.user_olympics_id = olympics.olympics_id
        LEFT JOIN 
            user AS responsable ON center.center_id = responsable.user_center_id AND responsable.user_type = 2
        LEFT JOIN 
            olympics_activity ON olympics.olympics_id = olympics_activity.olympics_id
        LEFT JOIN 
            activity ON olympics_activity.activity_id = activity.activity_id
        WHERE 
            user.user_id = ?;
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

  saveUserPermissionFile = async (user_id, fileName, filePath) => {
    console.log(filePath);
    
    try {
      const query = `
        UPDATE user 
        SET user_permission_file = ?, 
            user_is_auth = true
        WHERE user_id = ?
      `;
      await executeQuery(query, [filePath, user_id]);
      console.log(filePath);
  
      console.log("Archivo guardado en la base de datos.");
    } catch (error) {
      console.error("Error al guardar el archivo en la base de datos:", error);
      throw error;
    }
  };
}

export default new UserDal();
