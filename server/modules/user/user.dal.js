import { executeQuery } from '../../config/db.js';


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
          user_permission_file,
          user_center_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;
      await executeQuery(sql, values);
      
    } catch (error) {
      throw error;
    }
  }

  getUserByEmail = async (email) => {
    try {
      let sql = `SELECT * FROM user WHERE user_email = ? AND user_is_deleted = 0`;
      let result = await executeQuery(sql, [email]);
      return result;
      
    } catch (error) {
      throw error;
    }
  }

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
        center_id
      ]);
      return result;
    } catch (error) {
      console.log("Error al completar el centro:", error);
      throw new Error("Error al completar el centro");
    }
  };

  completeResponsible = async (userData) => {
    const { 
      user_name, 
      user_lastname, 
      user_dni, 
      user_phone, 
      user_password, 
      user_id,
      user_type
    } = userData;

    try {
      const sql = `
        UPDATE user SET 
          user_name = ?, 
          user_lastname = ?, 
          user_dni = ?, 
          user_phone = ?, 
          user_password = ?,
          user_type = ?
        WHERE user_id = ?
      `;
      const result = await executeQuery(sql, [
        user_name, 
        user_lastname, 
        user_dni, 
        user_phone, 
        user_password,
        user_id,
        user_type
      ]);
      return result;
    } catch (error) {
      console.log("Error al completar responsable:", error);
      throw new Error("Error al completar responsable");
    }
  };

  updateResponsible = async (user_id, userData) => {
    const { user_name, user_lastname, user_phone, user_dni } = userData;
    
    console.log("userData:", userData);
    console.log("user_id:", user_id);
  
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
      console.error("Error al actualizar responsable:", err);
      throw new Error("Error al actualizar responsable");
    }
  };

  updateCenter = async (id, data) => {
    const { center_city, center_province, center_address, center_phone, center_auth_doc } = data;
  
    try {
      const query = `
        UPDATE center
        SET 
          center_city = ?,
          center_province = ?,
          center_address = ?,
          center_phone = ?,
          center_auth_doc = ?
        WHERE center_id = ?;
      `;
      const result = await executeQuery(query, [
        center_city,
        center_province,
        center_address,
        center_phone,
        center_auth_doc,
        id,
      ]);
      return result;
    } catch (error) {
      throw new Error("Error en la base de datos");
    }
  };

  updateUserUser = async (id, userData) => {
    const { 
      user_name, 
      user_lastname, 
      user_tutor_name, user_tutor_lastname,
      user_dni, user_city, 
      user_address, 
      user_phone, 
      user_birth_date
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
         user_phone = ?,
         user_birth_date = ?
         WHERE user_id = ?`,
        [user_name, 
          user_lastname, 
          user_tutor_name,user_tutor_lastname, 
          user_dni, 
          user_city, 
          user_address, 
          user_phone, user_birth_date,
           id]
      );
      return result;
    } catch (err) {
      console.error("Error al actualizar usuario:", err);
      throw new Error("Error al actualizar usuario");
    }
  };

  updateDocumentValidation = async (user_id, user_is_validated) => {
    try {
      const result = await executeQuery(
        `UPDATE user SET user_is_validated = ? WHERE user_id = ?`,
        [user_is_validated, 
          user_id]
      );

      console.log("result:", result);
      
      return result;
    } catch (err) {
      console.error("Error al validar documento:", err);
      throw new Error("Error al validar documento");
    }
  };

}

export default new UserDal();