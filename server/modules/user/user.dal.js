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
}

export default new UserDal();